from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import User, Post

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
