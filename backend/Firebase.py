from  firebase_admin import credentials, firestore, auth
import firebase_admin


class FireBaseClass:
    def __init__(self) -> None:
        cred = credentials.Certificate('FireBaseServiceAccount.json')
        self.firebase_admin = firebase_admin.initialize_app(cred)

    def get_name(self):
        return self.firebase_admin.project_id
    
    def login(self, id_token, expires_in):
        session_cookie = auth.create_session_cookie(id_token, expires_in=expires_in)
        return session_cookie
        