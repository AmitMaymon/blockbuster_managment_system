from flask import Blueprint,jsonify,request
from BLL.subscriptionsBLL import subscriptionsBLL
from BLL.usersBLL import UsersBLL
from flask_jwt_extended import jwt_required,get_jwt

users_bll = UsersBLL()
members_bll = subscriptionsBLL("members")

members = Blueprint('members',__name__)

@members.route('/',methods=['GET'])
@jwt_required()
def get_all_members():
    jwt_data = get_jwt()
    has_permission = users_bll.check_permissions(jwt_data,'View Subscriptions')
    if not has_permission:
        return jsonify({"status":"error","msg":'You do not have permission to access this data'})

    members = members_bll.get_all()
    return jsonify(members)

@members.route('/<id>',methods=['GET'])
@jwt_required()
def get_member_by_id(id):
    jwt_data = get_jwt()
    has_permission = users_bll.check_permissions(jwt_data,'View Subscriptions')
    if not has_permission:
        return jsonify({"status":"error","msg":'You do not have permission to access this data'})


    members = members_bll.get_by_id(id)
    return jsonify(members)

@members.route('/',methods=['POST'])
@jwt_required()
def add_member():
    jwt_data = get_jwt()
    has_permission = users_bll.check_permissions(jwt_data,'Create Subscriptions')
    if not has_permission:
        return jsonify({"status":"error","msg":'You do not have permission to access this data'})


    obj = request.json
    members = members_bll.add_data(obj)
    return jsonify(members)

@members.route('/<id>',methods=['PUT'])
@jwt_required()
def update_member(id):
    jwt_data = get_jwt()
    has_permission = users_bll.check_permissions(jwt_data,'Create Subscriptions')
    if not has_permission:
        return jsonify({"status":"error","msg":'You do not have permission to access this data'})



    obj = request.json
    members = members_bll.update_data(id,obj)
    return jsonify(members)

@members.route('/<id>',methods=['DELETE'])
@jwt_required()
def delete_member(id):
    jwt_data = get_jwt()
    has_permission = users_bll.check_permissions(jwt_data,'Delete Subscriptions')
    if not has_permission:
        return jsonify({"status":"error","msg":'You do not have permission to access this data'})


    members = members_bll.delete_data(id)
    return jsonify(members)

