""" Set up the initial API config"""
import logging.config
from os import environ

from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from db import mysql
from core import api
from core import blueprint as web_api
from config import config as app_config


def create_app():
    """ Configuration required to set up the api"""
    load_dotenv()
    application_env = get_environment()
    logging.config.dictConfig(app_config[application_env].LOGGING)

    app = Flask(app_config[application_env].APP_NAME)
    app.config.from_object(app_config[application_env])

    app.register_blueprint(web_api)

    CORS(app, resources={r'/api/*': {'origins': '*'}})

    app.config['MYSQL_USER'] = environ.get('MYSQL_USER')
    app.config['MYSQL_PASSWORD'] = environ.get('MYSQL_PASSWORD')
    app.config['MYSQL_HOST'] = environ.get('MYSQL_HOST')
    app.config['MYSQL_DB'] = environ.get('MYSQL_DB')
    app.config['MYSQL_CURSORCLASS'] = environ.get('MYSQL_CURSORCLASS')

    mysql.init_app(app)
    api.init_app(app, add_specs=False)

    @app.errorhandler(400)
    def error_400(ex):
        """
        Custom error handler for when 400 HTTP codes occur.
        :param ex: String representing the error that occurred.
        :return: JSON describing the error.
        """
        return (
            jsonify(
                {
                    "error_description": "Bad Request",
                    "exception": str(ex),
                    "api_index": "/api/vi",
                }
            ),
            400,
        )

    @app.errorhandler(404)
    def error_404(ex):
        """
        Custom error handler for when 404 HTTP codes occur.
        :param ex: String representing the error that occurred.
        :return: JSON describing the error.
        """
        return (
            jsonify(
                {
                    "error_description": "Page Not Found",
                    "exception": str(ex),
                    "api_index": "/api/v1",
                }
            ),
            404,
        )

    return app


def get_environment():
    """ Returns the correct environment """
    return environ.get('APPLICATION_ENV') or 'development'
