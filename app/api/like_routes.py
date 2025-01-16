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

@like_routes.route('/', methods=['DELETE'])
@login_required
def delete_like():
    user_id = int(current_user.get_id())
    data = request.get_json()
    if data.get('type') == 'post':
        query = Like.query.filter(Like.user_id == user_id, Like.post_id == data.get('post_id'))
        like = query.filter(Like.comment_id == None)
        if not like or not Like.comment_id:
            return { 'errors': { 'Like': 'No like found.' } }, 404
        if len([like.id for like in like]):
            target_like = Like.query.get([like.id for like in like][0])
            db.session.delete(target_like)
            db.session.commit()
            return { 'Like': 'Like successfully deleted.' }
            # return {'-->':[target_like.to_dict() for like in like ]}

    query = Like.query.filter(Like.user_id == user_id, Like.comment_id == data.get('comment_id'))
    like = query.filter(Like.post_id == data.get("post_id"))

    if not like:
        return { 'errors': { 'Like': 'No like found.' } }, 404

    if len([like.id for like in like]):
        target_like = Like.query.get([like.id for like in like][0])
        db.session.delete(target_like)
        db.session.commit()
        return { 'Like': 'Like successfully deleted.' }
        # return {'-->':[target_like.to_dict() for like in like]}
    return { 'errors': { 'Like': 'No like found.' } }, 404