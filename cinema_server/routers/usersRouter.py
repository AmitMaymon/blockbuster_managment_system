from flask import Blueprint,jsonify,request
from BLL.usersBLL import UsersBLL
from flask_jwt_extended import jwt_required,get_jwt

users_bll = UsersBLL()

users = Blueprint('users',__name__)

@users.route('/',methods=['GET'])
@jwt_required()
def get_all_users():
    data = users_bll.get_all()
    jwt_data = get_jwt()
    has_permission = users_bll.check_permissions(jwt_data,'System Admin')
    if not has_permission:
        return jsonify({"msg":'You do not have permission to access this data'})
    
    for item in data:
        item['_id'] = str(item['_id'])
    return jsonify(data)

@users.route('/<id>',methods=['GET'])
@jwt_required()
def get_user(id):
    jwt_data = get_jwt()
    has_permission = users_bll.check_permissions(jwt_data,'System Admin')
    if not has_permission:
        return jsonify({"msg":'You do not have permission to access this data'})    
    
    data = users_bll.get_by_id(id)
    data['_id'] = str(data['_id'])
    return jsonify(data)

@users.route('/',methods=['POST'])
@jwt_required()
def add_user():
    jwt_data = get_jwt()
    has_permission = users_bll.check_permissions(jwt_data,'System Admin')
    if not has_permission:
        return jsonify({"msg":'You do not have permission to access this data'})   
     
    obj = request.json
    data = users_bll.add_user(obj)
    return jsonify(data)

@users.route('/<id>',methods=['PUT'])
@jwt_required()
def update_user(id):
    jwt_data = get_jwt()
    has_permission = users_bll.check_permissions(jwt_data,'System Admin')
    if not has_permission:
        return jsonify({"status":"error","msg":'You do not have permission to access this data'})
    
    obj = request.json
    data = users_bll.update_user(id,obj)
    return jsonify(data)

@users.route('/<id>',methods=['DELETE'])
@jwt_required()
def delete_user(id):
    jwt_data = get_jwt()
    has_permission = users_bll.check_permissions(jwt_data,'System Admin')
    if not has_permission:
        return jsonify({"status":"error","msg":'You do not have permission to access this data'})
    
    data = users_bll.delete_user(id)
    return jsonify(data)