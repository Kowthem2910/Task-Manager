from flask import Flask
from flask_cors import CORS
from Firebase import FireBaseClass

app = Flask(__name__)
CORS(app)

Firebase = FireBaseClass()


@app.route('/')
def main():
    return Firebase.get_Name()


if __name__ == '__main__':
    app.run(debug=True)