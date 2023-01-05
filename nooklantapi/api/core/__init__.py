from flask import Blueprint
from flask_restx import Api
from .web import api as web_api

blueprint = Blueprint('web_api', __name__, url_prefix='/api/v1')

api = Api(
    blueprint,
    title="Zoo API",
    version="1.0",
    description="A simple demo API",
)

api.add_namespace(web_api)
