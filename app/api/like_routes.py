from flask import Blueprint, jsonify, request
from app.models.db import db
from app.models import User, Like
from flask_login import current_user, login_required
from datetime import datetime

like_routes = Blueprint('likes', __name__)

@like_routes.route('/', methods=['POST'])
@login_required
def create_like():
    user_id = int(current_user.get_id())
    data = request.get_json()

    newLike = Like(
        user_id = user_id,
        post_id = data.get('post_id'),
        comment_id = data.get('comment_id')
    )

    db.session.add(newLike)
    db.session.commit()
    return newLike.to_dict(), 201

@like_routes.route('/<int:like_id>', methods=['DELETE'])
@login_required
def delete_like(like_id):
    like = Like.query.get(like_id)
    user_id = int(current_user.get_id())
    if not like or not like.user_id == user_id:
        return { 'errors': { 'Like': 'No like found.' } }, 404

    db.session.delete(like)
    db.session.commit()
    return { 'Like': 'Like successfully deleted.' }