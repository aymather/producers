from flask import Flask, jsonify, request
from flask_cors import CORS
from etc.etc import get_artist_credits_from_tidal, search_artists

app = Flask(__name__)

@app.route('/ping')
def index():
    print('Ping!')
    return jsonify(message='Ping!!!')

@app.route('/credits/<artist_id>')
def credits(artist_id):
    credits = get_artist_credits_from_tidal(artist_id)
    return credits.to_json(orient='records')

@app.route('/search')
def search():

    search_term = request.args.get('q')
    if search_term is None or search_term == '':
        return jsonify(message='Please provide a search term', status=400)
    
    artists = search_artists(search_term)
    return artists.to_json(orient='records')

CORS(app)

if __name__ == '__main__':
    app.run(debug=True)
