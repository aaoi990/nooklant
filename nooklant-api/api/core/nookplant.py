""" The api for web interface - purely feeds the UI """
from flask_restx import Namespace, Resource
from models.nook import Nook as nook_model

api = Namespace("services", description="Api for connecting services")

nook = api.model("Resource", nook_model)


@api.route("/")
class NookList(Resource):
    """Basic post request for connecting services."""
    @api.doc("enter a new nook")
    @api.expect(nook, validate=True)
    def post(self):
        """List all nooks"""
        print()

        return "test service api"
