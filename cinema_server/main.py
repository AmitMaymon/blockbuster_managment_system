from flask import Flask
from flask_cors import CORS
from BLL.usersBLL import UsersBLL

from routers.usersRouter import users

bll = UsersBLL()

app = Flask(__name__)
CORS(app)

app.register_blueprint(users,url_prefix='/users')

app.run(debug=True)