""" The api for web interface - purely feeds the UI """
from flask_restx import Namespace, Resource, fields
from db import mysql
from socket_helper import socketio
from flask_socketio import emit

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
        nook = cur.fetchall()
        cur.close()
        return nook


@socketio.on("connect")
def connected():
    """event listener when client connects to the server"""
    print("client has connected")
    cur = mysql.connection.cursor()
    cur.execute('SELECT * from nooks')
    categories = cur.fetchall()
    cur.close()
    emit("connect", list(categories))


@socketio.on('data')
def handle_message(data):
    """event listener when client types a message"""
    print("data from the front end: ", str(data))
    emit("data", {'data': data, 'id': 'test'}, broadcast=True)


@socketio.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    print("user disconnected")
    emit("disconnect", f"user disconnected", broadcast=True)
