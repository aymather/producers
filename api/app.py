from flask import Flask, jsonify, request
from flask_cors import CORS
from etc.etc import get_artist_credits_from_tidal, search_artists

app = Flask(__name__)

@app.route('/')
def index():
    return jsonify(message="Hello, World!")

@app.route('/credits/<artist_id>')
def credits(artist_id):
    credits = get_artist_credits_from_tidal(artist_id)
    return credits.to_json(orient='records')

@app.route('/search')
def search():

    search_term = request.args.get('q')

    if search_term is None:
        return jsonify(message="Please provide a search term")
    
    artists = search_artists(search_term)
    return artists.to_json(orient='records')

CORS(app)

if __name__ == '__main__':
    app.run(debug=True)
