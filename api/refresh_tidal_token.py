# from etc.Tidal import Tidal
from etc.etc import init_tidal_session, refresh_tidal_token

session, token = init_tidal_session()
refresh_tidal_token(session)