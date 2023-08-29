# from etc.Tidal import Tidal
import tidalapi
from etc.etc import json_stringify
from etc.etc import search_artists, json_parse, init_tidal_session, refresh_tidal_token

# tidal = Tidal()
# tidal.login()

# artists = tidal.search('Kanye West')
# print(artists)



session, token = init_tidal_session()
refresh_tidal_token(session)