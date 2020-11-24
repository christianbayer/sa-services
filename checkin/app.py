from dotenv import load_dotenv
from flask import Flask, app
from flask_cors import CORS
from flask_restful import Api
from flask_mongoengine import MongoEngine
import os

from routes import create_routes

# Set environment vars
load_dotenv()

# default mongodb configuration
db_config = {'MONGODB_SETTINGS': {
    'db': os.getenv('MONGO_DB'),
    'host': os.getenv('MONGO_HOSTNAME'),
    'port': int(os.getenv('MONGO_PORT')),
    'username': os.getenv('MONGO_USERNAME'),
    'password': os.getenv('MONGO_PASSWORD'),
    'authentication_source': 'admin'}}

def get_flask_app() -> app.Flask:
    # init flask
    flask_app = Flask(__name__)

    # configure app
    flask_app.config.update(db_config)

    # init api and routes
    api = Api(app=flask_app)
    create_routes(api=api)
    CORS(flask_app)

    # init mongoengine
    db = MongoEngine(app=flask_app)

    return flask_app

if __name__ == '__main__':
    PORT = os.getenv('PORT')

    # Main entry point when run in stand-alone mode.
    app = get_flask_app()
    app.run(host='0.0.0.0', port=PORT, debug=True)
