from flask import Blueprint,jsonify,request
from BLL.membersBLL import MembersBLL
from bson.errors import InvalidId

members_bll = MembersBLL()

members = Blueprint('members',__name__)


@members.route('/',methods=['GET'])
def get_all_members():
    data = members_bll.get_all()
    for item in data:
        item['_id'] = str(item['_id'])
    return jsonify(data)

@members.route('/<id>',methods=['GET'])
def get_member(id):
    try:
        data = members_bll.get_by_id(id)
        data[0]['_id'] = str(data[0]['_id'])
        return jsonify(data)
    except InvalidId:
        return jsonify('Invalid Object id')

@members.route('/',methods=['POST'])
def add_member():
    obj = request.json
    data = members_bll.add_data(obj)
    
    return jsonify(data)

@members.route('/<id>',methods=['PUT'])
def update_member(id):
    obj = request.json
    data = members_bll.update_data(id,obj)
    return jsonify(data)

@members.route('/<id>',methods=['DELETE'])
def delete_member(id):
    data = members_bll.delete_data(id)
    return jsonify(data)
