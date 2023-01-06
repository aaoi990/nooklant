""" The api for web interface - purely feeds the UI """
from flask_restx import Namespace, Resource, fields

from db import mysql

api = Namespace("nook", description="Web api for nook related operations")

nook = api.model(
    "Nook",
    {
        "id": fields.String(required=True),
        "guid": fields.String(required=True),
        "active": fields.Boolean(required=True),
        "ipAddrExt": fields.String(required=True),
        "ipAddrInt": fields.String(required=True),
        "username": fields.String(required=True),
        "hostname": fields.String(required=True),
        "os": fields.String(required=True),
        "osBuild": fields.String(required=True),
        "osVersion": fields.String(required=True),
        "pid": fields.Integer(required=True),
        "sleepTimeSeconds": fields.Integer(required=True),
        "killTimeHours": fields.Integer(required=True),
        "firstCheckIn": fields.Integer(required=True),
        "lastCheckIn": fields.Integer(required=True),
        "task": fields.String(required=False),
        "hostingFile": fields.String(required=False),
        "cryptKey": fields.String(required=True)
    },
)


@api.route("/")
class NookList(Resource):
    @api.doc("list_nooks")
    @api.marshal_list_with(nook)
    def get(self):
        """List all nooks"""
        cur = mysql.connection.cursor()
        cur.execute('SELECT * from nooks')
        categories = cur.fetchall()
        cur.close()
        return list(categories)


@api.route("/<guid>")
@api.param("guid", "The nook identifier")
@api.response(404, "Nook not found")
class Nook(Resource):
    @api.doc("get nook by guid")
    @api.marshal_with(nook)
    def get(self, guid):
        """Fetch a nook given its identifier"""
        cur = mysql.connection.cursor()
        cur.execute("SELECT * from nooks where guid = %s", [guid])
        categories = cur.fetchall()
        cur.close()
        return list(categories)
