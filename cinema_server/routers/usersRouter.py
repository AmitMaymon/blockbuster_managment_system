from flask import Blueprint,jsonify,request
from BLL.usersBLL import UsersBLL

users_bll = UsersBLL()

users = Blueprint('users',__name__)

@users.route('/',methods=['GET'])
def get_all_users():
    data = users_bll.get_all()
    
    for item in data:
        item['_id'] = str(item['_id'])
    return jsonify(data)

@users.route('/<id>',methods=['GET'])
def get_user(id):
    data = users_bll.get_by_id(id)
    data['_id'] = str(data['_id'])
    return jsonify(data)

@users.route('/',methods=['POST'])
def add_user():
    obj = request.json
    data = users_bll.add_user(obj)
    return jsonify(data)

@users.route('/<id>',methods=['PUT'])
def update_user(id):
    obj = request.json
    data = users_bll.update_user(id,obj)
    return jsonify(data)

@users.route('/<id>',methods=['DELETE'])
def delete_user(id):
    data = users_bll.delete_user(id)
    return jsonify(data)