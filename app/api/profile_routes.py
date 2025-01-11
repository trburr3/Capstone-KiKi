from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import User, Post, Comment, Message, Friend, Like
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
