from flask import Blueprint, jsonify, request
from app.models.db import db
from app.models import User, Friend
from flask_login import current_user, login_required
from sqlalchemy import or_

friend_routes = Blueprint('friends', __name__)

@friend_routes.route('/')
@login_required
def get_user_friends():
    user_id = int(current_user.get_id())
    friends = Friend.query.filter(or_(Friend.user_id == user_id, Friend.friend_id == user_id))
    if not friends :
        return { 'errors': { 'friends': 'No friends found.' } }, 404

    def friendNormalizer(friend):
        formattedFriend = {
            "id": friend.id,
        }
        if friend.user_id == user_id:
            formattedFriend['username'] = User.query.get(friend.friend_id).username
            formattedFriend['prof_pic'] = User.query.get(friend.friend_id).prof_pic
            formattedFriend['nickname'] = friend.friend_nickname
        else:
            formattedFriend['username'] = User.query.get(friend.user_id).username
            formattedFriend['prof_pic'] = User.query.get(friend.user_id).prof_pic
            formattedFriend['nickname'] = friend.user_nickname
        return formattedFriend
    return {'Friends': [friendNormalizer(friend) for friend in friends]}

@friend_routes.route('/', methods=['POST'])
@login_required
def create_friend():
    user_id = int(current_user.get_id())
    data = request.get_json()

    newFriend = Friend(
        user_id = user_id,
        friend_id = data.get('friend_id'),
    )

    db.session.add(newFriend)
    db.session.commit()
    return newFriend.to_dict(), 201

@friend_routes.route('/<int:friend_id>', methods=['PUT'])
@login_required
def edit_friend(friend_id):
    user_id = int(current_user.get_id())
    friend = Friend.query.get(friend_id)
    if not friend and not friend.user_id == user_id and not friend.friend_id == user_id:
        return { 'errors': { 'friend': 'No friend found.' } }, 404

    data = request.get_json()
    if friend.user_id == user_id:
        friend.friend_nickname = data.get("nickname")
    else:
        friend.user_nickname = data.get("nickname")

    db.session.commit()
    return friend.to_dict()

@friend_routes.route('/<int:friend_id>', methods=['DELETE'])
@login_required
def delete_friend(friend_id):
    user_id = int(current_user.get_id())
    friend = Friend.query.get(friend_id)
    if not friend and not friend.user_id == user_id and not friend.friend_id == user_id:
        return { 'errors': { 'Friend': 'No friend found.' } }, 404

    db.session.delete(friend)
    db.session.commit()
    return { 'Friend': 'Friend successfully deleted.' }