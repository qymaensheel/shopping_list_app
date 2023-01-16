from flask import Flask
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_restx import Api


from extensions import db
from models import ShoppingList, User
from shopping_lists import lists_ns
from authentication import auth_ns
from flask_cors import CORS

def create_app(config):

    app = Flask(__name__)
    app.config.from_object(config)

    CORS(app)

    db.init_app(app)

    migrate = Migrate(app, db)
    JWTManager(app)



    # TODO: pip freeze > req


    api = Api(app, doc="/docs")
    # serializer -> json

    api.add_namespace(auth_ns)
    api.add_namespace(lists_ns)

    @app.shell_context_processor
    def make_shell_context():
        return {
            "db": db,
            "ShoppingList": ShoppingList,
            "User": User
        }

    return app

