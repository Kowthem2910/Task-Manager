from  firebase_admin import credentials, firestore
import firebase_admin


class FireBaseClass:
    def __init__(self) -> None:
        cred = credentials.Certificate('FireBaseServiceAccount.json')
        self.FireBase = firebase_admin.initialize_app(cred)

    def get_Name(self):
        return self.FireBase.name