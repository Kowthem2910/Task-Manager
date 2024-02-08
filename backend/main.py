from flask import Flask
from flask_cors import CORS
from flask_restful import Api
import Resources

app = Flask(__name__)
CORS(app)
api = Api(app)


api.add_resource(Resources.data, '/name')
api.add_resource(Resources.login, '/login')


if __name__ == '__main__':
    app.run(debug=True)
