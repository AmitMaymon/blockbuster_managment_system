from flask import Blueprint,jsonify,request
from BLL.subscriptionsBLL import SubsBLL
from bson.errors import InvalidId

subs_bll = SubsBLL()

subs = Blueprint('subs',__name__)


@subs.route('/',methods=['GET'])
def get_all_subs():
    data = subs_bll.get_all()
    for item in data:
        item['_id'] = str(item['_id'])
    return jsonify(data)

@subs.route('/<id>',methods=['GET'])
def get_sub(id):
    try:
        data = subs_bll.get_by_id(id)
        data[0]['_id'] = str(data[0]['_id'])
        return jsonify(data)
    except InvalidId:
        return jsonify('Invalid Object id')

@subs.route('/',methods=['POST'])
def add_sub():
    obj = request.json
    data = subs_bll.add_data(obj)
    
    return jsonify(data)

@subs.route('/<id>',methods=['PUT'])
def update_sub(id):
    obj = request.json
    data = subs_bll.update_data(id,obj)
    return jsonify(data)

@subs.route('/<id>',methods=['DELETE'])
def delete_sub(id):
    data = subs_bll.delete_data(id)
    return jsonify(data)
