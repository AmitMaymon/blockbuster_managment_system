from flask import Blueprint,jsonify,request
from BLL.moviesBLL import MoviesBLL
from bson.errors import InvalidId

movies_bll = MoviesBLL()

movies = Blueprint('movies',__name__)


@movies.route('/',methods=['GET'])
def get_all_movies():
    data = movies_bll.get_all()
    for item in data:
        item['_id'] = str(item['_id'])
    return jsonify(data)

@movies.route('/<id>',methods=['GET'])
def get_movie(id):
    try:
        data = movies_bll.get_by_id(id)
        data[0]['_id'] = str(data[0]['_id'])
        return jsonify(data)
    except InvalidId:
        return jsonify('Invalid Object id')

@movies.route('/',methods=['POST'])
def add_movie():
    obj = request.json
    data = movies_bll.add_data(obj)
    
    return jsonify(data)

@movies.route('/<id>',methods=['PUT'])
def update_movie(id):
    obj = request.json
    data = movies_bll.update_data(id,obj)
    return jsonify(data)

@movies.route('/<id>',methods=['DELETE'])
def delete_movie(id):
    data = movies_bll.delete_data(id)
    return jsonify(data)
