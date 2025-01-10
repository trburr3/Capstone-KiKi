from flask import Blueprint, jsonify, request
from app.models.db import db
from app.models import User, Post
from flask_login import current_user, login_required
from datetime import datetime

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
@login_required
def get_all_posts():
    posts = Post.query.filter(Post.private == False).order_by(Post.id.desc())
    if not posts :
        return { 'errors': { 'Posts': 'No posts found.' } }, 404
    def postNormalizer(post):
        formattedPost = {
            "id": post.id,
            "author_id": post.author_id,
            "author_name": User.query.get(post.author_id).first_name + ' ' + User.query.get(post.author_id).last_name,
            "auhtor_pic": User.query.get(post.author_id).prof_pic,
            "body": post.body,
            "language": post.language,
            "level": post.level,
            "title": post.title,
            "created_at": post.created_at,
            "updated_at": post.updated_at,
        }
        return formattedPost
    return {'Posts': [postNormalizer(post) for post in posts]}

@post_routes.route('/', methods=['POST'])
@login_required
def create_post():
    user_id = int(current_user.get_id())
    data = request.get_json()

    newPost = Post(
        author_id = user_id,
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
    user_id = int(current_user.get_id())
    post = Post.query.get(post_id)
    if not post or not post.author_id == user_id:
        return { 'errors': { 'Post': 'No post found.' } }, 404

    data = request.get_json()
    if data.get("body"):
        post.body = data.get("body")
    if data.get("title"):
        post.title = data.get("title")
    if data.get("private"):
        post.private  = data.get("private")
    if data.get("level"):
        post.level  = data.get("level")
    post.updated_at = datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
    db.session.commit()
    return post.to_dict()

@post_routes.route('/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    user_id = int(current_user.get_id())
    post = Post.query.get(post_id)
    if not post or not post.author_id == user_id:
        return { 'errors': { 'Post': 'No post found.' } }, 404

    db.session.delete(post)
    db.session.commit()
    return { 'Post': 'Post successfully deleted.' }