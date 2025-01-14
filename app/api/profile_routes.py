from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import User, Post, Comment, Message, Friend, Like
from app.models.db import db
from app.forms import EditProfileForm
from sqlalchemy import or_

profile_routes = Blueprint('profile', __name__)

@profile_routes.route('/posts')
@login_required
def get_all_posts():
    user_id = int(current_user.get_id())
    allPosts = Post.query.order_by(Post.updated_at).filter(Post.author_id == user_id)
    if not allPosts :
        return { 'errors': { 'posts': 'No posts found.' } }, 404
    public_posts = [post.to_dict() for post in allPosts if post.private == False]
    private_posts = [post.to_dict() for post in allPosts if post.private == True]
    return {'Public': public_posts, 'Private': private_posts}

@profile_routes.route('/achievements')
@login_required
def get_all_achievements():
    user_id = int(current_user.get_id())
    achievements = []
    public_posts = Post.query.order_by(Post.updated_at).filter(Post.author_id == user_id, Post.private == False)
    friends = Friend.query.filter(or_(Friend.user_id == user_id, Friend.friend_id == user_id))
    post_likes = Like.query.filter(Like.user_id == user_id, Like.comment_id is None)
    messages_sent = Message.query.filter(Message.sender_id == user_id)
    comments = Comment.query.filter(Comment.author_id == user_id)
    if len([friend.to_dict() for friend in friends]) >= 3:
        achievements.append(1)
    if len([message.to_dict() for message in messages_sent]) >= 5:
        achievements.append(2)
    if len([post.to_dict() for post in public_posts]):
        achievements.append(3)
    if len([comment.to_dict() for comment in comments]) >= 3:
        achievements.append(4)
    if len([like.to_dict() for like in post_likes]) >= 5:
        achievements.append(5)
    if not achievements :
        return { 'errors': { 'Achievements': 'No ahcievements yet found.' } }, 404

    return {'Achievements': achievements}
@profile_routes.route('/edit', methods=['PUT'])
@login_required
def edit_profile():
    form = EditProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_id = current_user.get_id()
        user = User.query.get(user_id)

        if form.data['first_name']:
            user.first_name = form.data['first_name']
        if form.data['email']:
            user.email = form.data['email']
        if form.data['last_name']:
            user.last_name = form.data['last_name']
        if form.data['city']:
            user.city = form.data['city']
        if form.data['state']:
            user.state = form.data['state']
        if form.data['learning']:
            user.learning = form.data['learning']
        if form.data['level']:
            user.level = form.data['level']
        if form.data['bio']:
            user.bio = form.data['bio']
        if form.data['prof_pic']:
            user.prof_pic = form.data['prof_pic']

        db.session.commit()
        newUser = {
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
        return newUser
    return form.errors, 401

@profile_routes.route('/delete/<int:user_id>', methods=['DELETE'])
# @login_required
def delete_profile(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return { 'message': "Successfully deleted" }

    return {'errors': {'message': "User could not be found"}}, 404