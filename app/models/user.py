from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    native = db.Column(db.String(255), nullable=False)
    learning = db.Column(db.String(255), nullable=False)
    level = db.Column(db.Integer, nullable=False)
    bio = db.Column(db.String(1000), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    pref_theme = db.Column(db.String(255), default='light')
    pref_chatroom = db.Column(db.String(255), default='light')
    prof_pic = db.Column(db.Integer, nullable=False)

    #relationships
    messages = db.relationship('Message', backref='sender', cascade='all, delete-orphan', lazy=True)
    posts = db.relationship('Post', backref='author', cascade='all, delete-orphan', lazy=True)
    comments = db.relationship('Comment', backref='author', cascade='all, delete-orphan', lazy=True)
    requests = db.relationship('Request', backref='sender', cascade='all, delete-orphan', lazy=True)
    friends = db.relationship('Friend', backref='pair', cascade='all, delete-orphan', lazy=True)
    likes = db.relationship('Like', backref='creator', cascade='all, delete-orphan', lazy=True)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.id,
            'last_name': self.username,
            'native': self.native,
            'learning': self.learning,
            'level': self.level,
            'bio': self.bio,
            'city': self.city,
            'state': self.state,
            'pref_theme': self.pref_theme,
            'pref_chatroom': self.pref_chatroom,
            'prof_pic': self.prof_pic,
        }
