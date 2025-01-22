from flask import Blueprint, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)

def userNormalizer(user):
    normalUser = {
        'id': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'username': user.username,
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

@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return userNormalizer(current_user)
    return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return userNormalizer(user)
    return form.errors, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            native=form.data['native'],
            learning=form.data['learning'],
            level=form.data['level'],
            bio=form.data['bio'],
            city=form.data['city'],
            state=form.data['state'],
            prof_pic=form.data['prof_pic'],
            # pref_chatroom = 'light',
            # pref_theme = 'light',
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return userNormalizer(user)
    return form.errors, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401