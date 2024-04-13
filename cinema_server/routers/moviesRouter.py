from flask import Blueprint,jsonify,request
from BLL.subscriptionsBLL import subscriptionsBLL
from BLL.usersBLL import UsersBLL
from flask_jwt_extended import jwt_required,get_jwt

users_bll = UsersBLL()
movies_bll = subscriptionsBLL("movies")

movies = Blueprint('movies',__name__)

@movies.route('/',methods=['GET'])
@jwt_required()
def get_all_movies():
    jwt_data = get_jwt()
    has_permission = users_bll.check_permissions(jwt_data,'View Movies')
    if not has_permission:
        return jsonify({"status":"error","msg":'You do not have permission to access this data'})

    movies = movies_bll.get_all()
    return jsonify(movies)

@movies.route('/<int:id>',methods=['GET'])
@jwt_required()
def get_movie_by_id(id):
    jwt_data = get_jwt()
    has_permission = users_bll.check_permissions(jwt_data,'View Movies')
    if not has_permission:
        return jsonify({"status":"error","msg":'You do not have permission to access this data'})


    movies = movies_bll.get_by_id(id)
    return jsonify(movies)

@movies.route('/',methods=['POST'])
@jwt_required()
def add_movie():
    jwt_data = get_jwt()
    has_permission = users_bll.check_permissions(jwt_data,'Create Movies')
    if not has_permission:
        return jsonify({"status":"error","msg":'You do not have permission to access this data'})


    obj = request.json
    movies = movies_bll.add_data(obj)
    return jsonify(movies)

@movies.route('/<int:id>',methods=['PUT'])
@jwt_required()
def update_movie(id):
    jwt_data = get_jwt()
    has_permission = users_bll.check_permissions(jwt_data,'Create Movies')
    if not has_permission:
        return jsonify({"status":"error","msg":'You do not have permission to access this data'})



    obj = request.json
    movies = movies_bll.update_data(id,obj)
    return jsonify(movies)

@movies.route('/<int:id>',methods=['DELETE'])
@jwt_required()
def delete_movie(id):
    jwt_data = get_jwt()
    has_permission = users_bll.check_permissions(jwt_data,'Delete Movies')
    if not has_permission:
        return jsonify({"status":"error","msg":'You do not have permission to access this data'})


    movies = movies_bll.delete_data(id)
    return jsonify(movies)

