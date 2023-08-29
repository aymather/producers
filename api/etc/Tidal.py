import logging
import json
from pathlib import Path
import tidalapi

logger = logging.getLogger(__name__)

oauth_file = Path('tidal-oauth.json')


class Tidal:
    def __init__(self):
        self._active_session = tidalapi.Session()

    def _save_oauth_session(self, oauth_file: Path):
        # create a new session
        if self._active_session.check_login():
            # store current OAuth session
            data = {}
            data['token_type'] = { 'data': self._active_session.token_type }
            data['session_id'] = { 'data': self._active_session.session_id }
            data['access_token'] = { 'data': self._active_session.access_token }
            data['refresh_token'] = { 'data': self._active_session.refresh_token }
            with oauth_file.open('w') as outfile:
                json.dump(data, outfile)
            self._oauth_saved = True

    def _load_oauth_session(self, **data):
        assert self._active_session, 'No session loaded'
        args = {
            'token_type': data.get('token_type', {}).get('data'),
            'access_token': data.get('access_token', {}).get('data'),
            'refresh_token': data.get('refresh_token', {}).get('data'),
        }

        self._active_session.load_oauth_session(**args)

    def login(self):
        try:
            # attempt to reload existing session from file
            with open(oauth_file) as f:
                logger.info('Loading OAuth session from %s...', oauth_file)
                data = json.load(f)
                self._load_oauth_session(**data)
        except Exception as e:
            logger.info('Could not load OAuth session from %s: %s', oauth_file, e)

        if not self._active_session.check_login():
            logger.info('Creating new OAuth session...')
            self._active_session.login_oauth_simple()
            self._save_oauth_session(oauth_file)

        if self._active_session.check_login():
            logger.info('TIDAL Login OK')
        else:
            logger.info('TIDAL Login KO')
            raise ConnectionError('Failed to log in.')