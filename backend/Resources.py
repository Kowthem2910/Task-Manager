from flask import jsonify, request, Response
from flask_restful import Resource
from Firebase import FireBaseClass
import datetime

firebase = FireBaseClass()

class data (Resource):
    def get(self):
        res = firebase.get_name()
        return jsonify({'response':res})
    

class login (Resource):
    def get(self):
        return jsonify({'response':'Login'})
    
    def post(self):
        print(request.json)
        id_token = request.json['idToken']
        expires_in = datetime.timedelta(days=5)
        try:
            session_cookie = firebase.login(id_token, expires_in)
            response = jsonify({'status':'success','code':200})
            expires = datetime.datetime.now() + expires_in
            response.set_cookie('session', session_cookie, expires=expires, httponly=True, secure=True)   
            return response
        except Exception as e:
            return jsonify({'error':str(e)})