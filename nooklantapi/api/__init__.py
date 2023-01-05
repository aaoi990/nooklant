""" Set up the initial API config"""
import logging.config
from os import environ
from flask import Flask
from flask_cors import CORS

from api.core import api
from api.core import blueprint as web_api
from .config import config as app_config


def create_app():
    """ Configuration required to set up the api"""
    application_env = get_environment()
    logging.config.dictConfig(app_config[application_env].LOGGING)
    app = Flask(app_config[application_env].APP_NAME)
    app.config.from_object(app_config[application_env])

    app.register_blueprint(web_api)

    CORS(app, resources={r'/api/*': {'origins': '*'}})

    api.init_app(app, add_specs=False)

    return app


def get_environment():
    """ Returns the correct environment """
    return environ.get('APPLICATION_ENV') or 'development'
