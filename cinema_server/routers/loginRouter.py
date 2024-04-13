from flask import Blueprint,jsonify,request
from BLL.usersBLL import UsersBLL

users_bll = UsersBLL()

login = Blueprint('login',__name__)

@login.route('/',methods=['POST'])
def login_user():

    obj = request.json
    data = users_bll.login(obj['username'],obj['password'])
    return jsonify(data)

@login.route('/signup',methods=['POST'])
def sign_up():

    obj = request.json
    data = users_bll.signup(obj['username'],obj['password'])
    return jsonify(data)

    