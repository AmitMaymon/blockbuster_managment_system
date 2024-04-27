from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from BLL.usersBLL import UsersBLL

from routers.usersRouter import users
from routers.loginRouter import login
from routers.subscriptionsRouter import subs
from routers.moviesRouter import movies
from routers.membersRouter import members

CLIENT = 'http://localhost:3000'


bll = UsersBLL()

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'Banana96'


CORS(app, resources={r"/*": {"origins": "*"}})
app.register_blueprint(login,url_prefix='/login')
app.register_blueprint(users,url_prefix='/users')
app.register_blueprint(subs,url_prefix='/subs')
app.register_blueprint(members,url_prefix='/members')
app.register_blueprint(movies,url_prefix='/movies')

jwt = JWTManager(app)




app.run(debug=True)