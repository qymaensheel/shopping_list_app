from flask import jsonify, request, make_response
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from flask_restx import Resource, Namespace, fields
from werkzeug.security import check_password_hash, generate_password_hash

from models import User

auth_ns = Namespace("authentication", description="namespace for authentication")

signup_model = auth_ns.model(
    "SignUp",
    {
        "username": fields.String(),
        "email": fields.String(),
        "password": fields.String()
    }
)

login_model = auth_ns.model(
    "Login",
    {
        "username": fields.String(),
        "password": fields.String()
    }
)


@auth_ns.route('/sign_up')
class SignUp(Resource):

    @auth_ns.expect(signup_model)
    def post(self):
        request_data = request.get_json()

        username = request_data.get('username')

        db_user = User.query.filter_by(username=username).first()
        if db_user is None:
            new_user = User(
                username=request_data.get('username'),
                email=request_data.get('email'),
                password=generate_password_hash(request_data.get('password'))
            )
            new_user.save()
            return make_response(jsonify({"message": f"User {username} created."}), 201)
        else:
            return make_response(jsonify({"message": f"User {username} already exists."}), 409)


@auth_ns.route('/login')
class Login(Resource):

    @auth_ns.expect(login_model)
    def post(self):
        request_data = request.get_json()
        username = request_data.get('username')
        password = request_data.get('password')

        db_user_login = User.query.filter_by(username=username).first()

        if db_user_login and check_password_hash(db_user_login.password, password):
            access_token = create_access_token(identity=db_user_login.username)
            refresh_token = create_refresh_token(identity=db_user_login.username)

            return jsonify(
                {
                    "access_token": access_token,
                    "refresh_token": refresh_token
                }
            )
        else:
            return make_response(jsonify({"message": f"Wrong credentials"}), 401)


@auth_ns.route('/refresh')
class Refresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()

        new_access_token = create_access_token(identity=current_user)

        return make_response(jsonify({"access_token": new_access_token}), 200)
