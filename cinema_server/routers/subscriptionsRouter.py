from flask import Blueprint,jsonify,request
from BLL.subscriptionsBLL import subscriptionsBLL
from BLL.usersBLL import UsersBLL 
from flask_jwt_extended import jwt_required,get_jwt

users_bll = UsersBLL()

subs_bll = subscriptionsBLL("subs")

subs = Blueprint('subs',__name__)

@subs.route('/',methods=['GET'])
@jwt_required()
def get_all_subs():
    jwt_data = get_jwt()
    has_permission = users_bll.check_permissions(jwt_data,'View Subscriptions')
    if not has_permission:
        return jsonify({"status":"error","msg":'You do not have permission to access this data'})
    
    subs = subs_bll.get_all()
    return jsonify(subs)

@subs.route('/<int:id>',methods=['GET'])
@jwt_required()
def get_sub_by_id(id):
    jwt_data = get_jwt()
    has_permission = users_bll.check_permissions(jwt_data,'View Subscriptions')
    if not has_permission:
        return jsonify({"status":"error","msg":'You do not have permission to access this data'})
    


    subs = subs_bll.get_by_id(id)
    return jsonify(subs)

@subs.route('/',methods=['POST'])
@jwt_required()
def add_sub():
    jwt_data = get_jwt()
    has_permission = users_bll.check_permissions(jwt_data,'Create Subscriptions')
    if not has_permission:
        return jsonify({"status":"error","msg":'You do not have permission to access this data'})
    

    obj = request.json
    subs = subs_bll.add_data(obj)
    return jsonify(subs)

@subs.route('/<int:id>',methods=['PUT'])
@jwt_required()
def update_sub(id):
    jwt_data = get_jwt()
    has_permission = users_bll.check_permissions(jwt_data,'Create Subscriptions')
    if not has_permission:
        return jsonify({"status":"error","msg":'You do not have permission to access this data'})
    


    obj = request.json
    subs = subs_bll.update_data(id,obj)
    return jsonify(subs)

@subs.route('/<int:id>',methods=['DELETE'])
@jwt_required()
def delete_sub(id):
    jwt_data = get_jwt()
    has_permission = users_bll.check_permissions(jwt_data,'Delete Subscriptions')
    if not has_permission:
        return jsonify({"status":"error","msg":'You do not have permission to access this data'})
    
    subs = subs_bll.delete_data(id)
    return jsonify(subs)


