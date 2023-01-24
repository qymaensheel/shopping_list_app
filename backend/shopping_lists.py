from flask import request, jsonify, make_response
from flask_jwt_extended import jwt_required
from flask_restx import Namespace, Resource, fields

from models import ShoppingList

lists_ns = Namespace('shopping_list', description="namespace for shopping lists")

shopping_list_model = lists_ns.model(
    "ShoppingList",
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "items": fields.String()
    }
)


@lists_ns.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {"message": "Hello World"}


@lists_ns.route('/shopping_lists')
class ShoppingListsResource(Resource):

    @lists_ns.marshal_list_with(shopping_list_model)
    def get(self):  # Get all shopping lists
        lists = ShoppingList.query.all()

        return lists

    # @lists_ns.marshal_with(shopping_list_model)
    @lists_ns.expect(shopping_list_model)
    @jwt_required()
    def post(self):  # Create a new shopping list
        request_data = request.get_json()
        new_list = ShoppingList(
            title=request_data.get('title'),
            items=request_data.get('items')
        )
        new_list.save()
        return make_response(jsonify({"message": "List created successfully"}), 201)


@lists_ns.route('/shopping_list/<int:list_id>')
class ShoppingListResource(Resource):

    @lists_ns.marshal_with(shopping_list_model)
    def get(self, list_id):  # Get a shopping list by id
        shopping_list = ShoppingList.query.get_or_404(list_id)
        return shopping_list

    @lists_ns.marshal_with(shopping_list_model)
    @jwt_required()
    def put(self, list_id):  # Update shopping list by id
        list_to_update = ShoppingList.query.get_or_404(list_id)
        request_data = request.get_json()
        list_to_update.update(request_data.get('title'), request_data.get('items'))
        return list_to_update

    @lists_ns.marshal_with(shopping_list_model)
    @jwt_required()
    def delete(self, list_id):  # Delete shopping list by id
        list_to_delete = ShoppingList.query.get_or_404(list_id)
        list_to_delete.delete()
        return list_to_delete
