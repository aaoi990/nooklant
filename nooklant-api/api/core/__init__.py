""" Blueprints and config for the swagger config """
from flask import Blueprint
from flask_restx import Api

from .web import api as web_api

blueprint = Blueprint('web_api', __name__, url_prefix='/api/v1')

api = Api(
    blueprint,
    title="Nooklant Web API",
    version="1.0",
    description="Web interface API",
)

api.add_namespace(web_api)
