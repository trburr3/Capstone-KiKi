from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)

def userNormalizer(user):
    normalUser = {
        'id': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'city': user.city,
        'state': user.state,
        'native': user.native,
        'learning': user.learning,
        'level': user.level,
        'bio': user.bio,
        'prof_pic': user.prof_pic,
        "pref_chatroom": user.pref_chatroom,
        "pref_theme": user.pref_theme,
    }
    return normalUser


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    # def userNormalizer(user):
    #     normalUser = {
    #         'id': user.id,
    #         'first_name': user.first_name,
    #         'last_name': user.last_name,
    #         'email': user.email,
    #         'city': user.city,
    #         'state': user.state,
    #         'native': user.native,
    #         'learning': user.learning,
    #         'level': user.level,
    #         'bio': user.bio,
    #         'prof_pic': user.prof_pic,
    #         "pref_chatroom": user.pref_chatroom,
    #         "pref_theme": user.pref_theme,
    #     }
    #     return normalUser
    return {'users': [userNormalizer(user) for user in users]}


# @user_routes.route('/<int:id>')
# @login_required
# def user(id):
#     """
#     Query for a user by id and returns that user in a dictionary
#     """
#     user = User.query.get(id)
#     return userNormalizer(user)

@user_routes.route('/current')
@login_required
def user():
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(int(current_user.get_id()))
    if current_user.is_authenticated:
        return userNormalizer(user)
    return {'errors': {'message': 'Unauthorized'}}, 401
