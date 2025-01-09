from flask import Blueprint, jsonify, request
from app.models.db import db
from app.models import User, Post
from flask_login import current_user, login_required
from datetime import datetime

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
@login_required
def get_all_posts():
    posts = Post.query.order_by(Post.updated_at)filter(Post.private == False)
    if not posts :
        return { 'errors': { 'posts': 'No posts found.' } }, 404
    return {'Posts': [post.to_dict() for post in posts]}

@post_routes.route('/', methods=['POST'])
@login_required
def create_post():
    user_id = current_user.get_id()
    data = request.get_json()

    newPost = Post(
        user_id = user_id,
        body = data.get('body'),
        level = data.get('level'),
        language = data.get('language'),
        title = data.get('title'),
        private = data.get('private'),
    )

    db.session.add(newPost)
    db.session.commit()
    return newPost.to_dict(), 201

@post_routes.route('/<int:post_id>', methods=['PUT'])
@login_required
def edit_post(post_id):
    post = Post.query.get(post_id)
    if not post or not post.author_id == current_user.get_id():
        return { 'errors': { 'post': 'No post found.' } }, 404

    data = request.get_json()
    post.body = data.get("body")
    post.title = data.get("title")
    post.private  = data.get("private")
    post.level  = data.get("level")
    post.updated_at = datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
    db.session.commit()
    return message.to_dict()

@post_routes.route('/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    post = Post.query.get(post_id)
    if not post or not post.author_id == current_user.get_id():
        return { 'errors': { 'post': 'No post found.' } }, 404

    db.session.delete(post)
    db.session.commit()
    return { 'post': 'Post successfully deleted.' }