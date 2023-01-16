from flask_restx import fields

Nook = {
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
}
