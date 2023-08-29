import concurrent
import tidalapi
import pandas as pd
from datetime import datetime
import requests
import json


TOKEN_FULLFILE = './tidal-oauth.json'

def refresh_tidal_token(session):

    """
    
        @param session: The tidal session object to refresh the token for.

        This function refreshes the token for the given session and writes the new token
        to the JSON file.
    
    """

    refresh_token = session.refresh_token
    session.token_refresh(refresh_token)

    token = {
        'access_token': session.access_token,
        'refresh_token': session.refresh_token,
        'expiry_time': session.expiry_time,
        'token_type': session.token_type
    }

    json_stringify(token, TOKEN_FULLFILE)


def datetime_serializer(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError('Type not serializable')


def json_stringify(obj, fullfile):

    """
    
        @param obj: The object to stringify.
        @param fullfile: The full path to the file to write the JSON to.

        This function takes in an object and writes a json file to the specified path
        with the contents of the dict.
    
    """

    # Write the dictionary to a JSON file
    with open(fullfile, 'w') as f:
        json.dump(obj, f, default=datetime_serializer)


def json_parse(fullfile):

    """
    
        @param fullfile: The full path to the file to read the JSON from.

    """

    # Read the JSON file into a dictionary
    with open(fullfile, 'r') as f:
        loaded_dict = json.load(f)

    # Parse datetime strings back to datetime objects
    for key, value in loaded_dict.items():
        if isinstance(value, str):
            try:
                loaded_dict[key] = datetime.strptime(value, '%Y-%m-%dT%H:%M:%S.%f')  # ISO format
            except ValueError:
                # if conversion fails, retain the original string
                pass

    return loaded_dict

def run_async(funcs):
    data = []
    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = [executor.submit(func) for func in funcs]
        for future in concurrent.futures.as_completed(futures):
            data.extend(future.result())
    return data

def parse_credits(credits_object):
    credits = []
    for item in credits_object['items']:
        for subitem in item['credits']:
            for contributor in subitem['contributors']:
                if 'id' in contributor and 'name' in contributor:
                    credits.append({
                        'type': subitem['type'],
                        'name': contributor['name'],
                        'id': contributor['id']
                    })
    return credits

def get_track_credits_by_id(album_id, token):
    url = f'https://listen.tidal.com/v1/albums/{album_id}/items/credits?replace=true&includeContributors=true&offset=0&limit=100&countryCode=US&locale=en_US'
    headers = { 'Authorization': 'Bearer ' + token['access_token'] }
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    data = response.json()
    return parse_credits(data)

def lambda_wrapper(func, *args, **kwargs):
    return lambda: func(*args, **kwargs)

def get_credits_by_artist(artist, token, limit=15):

    # Start by getting the artists top tracks
    tracks = artist.get_top_tracks()
    tracks = tracks[:limit]

    funcs = [lambda_wrapper(get_track_credits_by_id, track.album.id, token) for track in tracks]
    data = run_async(funcs)

    return pd.DataFrame(data)

def init_tidal_session():

    # Init a session with your token
    session = tidalapi.Session()
    token = json_parse(TOKEN_FULLFILE)
    session.load_oauth_session(token['token_type'], token['access_token'], token['refresh_token'], token['expiry_time'])
    return session, token

def get_artist_network_credits(artist, session, token):

    # Get network of similar artists
    try:
        similar_artists = artist.get_similar()
    except:
        return None
    similar_artists = similar_artists[:10]

    # Get all the tracks for all the related artists
    tracks = run_async([ lambda_wrapper(related_artist.get_top_tracks, limit=10) for related_artist in similar_artists ])

    # Get the credits for all the related artists' tracks
    similar_tracks_credits = run_async([ lambda_wrapper(get_track_credits_by_id, track.album.id, token) for track in tracks ])
    similar_tracks_credits = pd.DataFrame(similar_tracks_credits)

    return similar_tracks_credits

def get_artist_credits_from_tidal(artist_id):

    session, token = init_tidal_session()

    # Get original artist
    artist = session.artist(artist_id)

    # Get the credits for the artists network
    similar_tracks_credits = get_artist_network_credits(artist, session, token)

    # If the artist network credits are None, then increase the number of credits to get
    # from the original artist
    if similar_tracks_credits is None:

        # Get credits for the original artist
        credits = get_credits_by_artist(artist, token, limit=100)
        return credits.drop_duplicates(subset=['id', 'type']).reset_index(drop=True)
    
    else:

        # Get credits for the original artist
        credits = get_credits_by_artist(artist, token, limit=15)

        # Merge original artist credits with related artist credits
        credits = pd.concat([ credits, similar_tracks_credits ]).drop_duplicates(subset=['id', 'type']).reset_index(drop=True)

        return credits

def search_artists(search_term):

    session, token = init_tidal_session()
    artists = session.search(search_term)

    data = []
    for artist in artists['artists']:

        # Extract the image if there is one
        image = None
        try: image = artist.image()
        except: pass

        data.append({ 'id': artist.id, 'name': artist.name, 'image': image })

    return pd.DataFrame(data)

