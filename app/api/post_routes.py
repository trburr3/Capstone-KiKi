from flask import Blueprint, jsonify, request
from app.models.db import db
from app.models import User, Post, Comment, Like
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
        likes = Like.query.filter(Like.post_id == post.id)
        formattedPost = {
            "id": post.id,
            "author_id": post.author_id,
            "author_name": User.query.get(post.author_id).first_name + ' ' + User.query.get(post.author_id).last_name,
            "author_pic": User.query.get(post.author_id).prof_pic,
            "author_city": User.query.get(post.author_id).city,
            "body": post.body,
            "language": post.language,
            "level": post.level,
            "title": post.title,
            "created_at": post.created_at,
            "updated_at": post.updated_at,
            "likes": [User.query.get(like.user_id).username for like in likes if like.comment_id is None ]
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

@post_routes.route('/<int:post_id>/comments')
@login_required
def get_all_comments(post_id):
    comments = Comment.query.filter(Comment.post_id == post_id).order_by(Comment.id.desc())
    if not comments :
        return { 'errors': { 'Comments': 'No comments found.' } }, 404
    def commentNormalizer(comment):
        likes = Like.query.filter(Like.post_id == post_id, Like.comment_id == comment.id)
        formattedComment = {
            "id": comment.id,
            "author_id": comment.author_id,
            "author_name": User.query.get(comment.author_id).first_name + ' ' + User.query.get(comment.author_id).last_name,
            "author_username": User.query.get(comment.author_id).username,
            "author_pic": User.query.get(comment.author_id).prof_pic,
            "comment": comment.comment,
            "created_at": comment.created_at,
            "updated_at": comment.updated_at,
            "likes": [User.query.get(like.user_id).username for like in likes]
        }
        return formattedComment
    return {'Comments': [commentNormalizer(comment) for comment in comments]}

@post_routes.route('/<int:post_id>/comments', methods=['POST'])
@login_required
def create_comment(post_id):
    user_id = int(current_user.get_id())
    data = request.get_json()

    newComment = Comment(
        author_id = user_id,
        post_id = post_id,
        comment = data.get('comment'),
    )

    db.session.add(newComment)
    db.session.commit()
    return newComment.to_dict(), 201

@post_routes.route('/comments/<int:comment_id>', methods=['PUT'])
@login_required
def edit_comment(comment_id):
    user_id = int(current_user.get_id())
    target_comment = Comment.query.get(comment_id)
    if not target_comment or not target_comment.author_id == user_id:
        return { 'errors': { 'Comment': 'No comment found.' } }, 404

    data = request.get_json()
    target_comment.comment = data.get("comment")

    target_comment.updated_at = datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
    db.session.commit()
    return target_comment.to_dict()

@post_routes.route('/comments/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    user_id = int(current_user.get_id())
    comment = Comment.query.get(comment_id)
    if not comment or not comment.author_id == user_id:
        return { 'errors': { 'Comment': 'No comment found.' } }, 404

    db.session.delete(comment)
    db.session.commit()
    return { 'Comment': 'Comment successfully deleted.' }