from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    body = db.Column(db.String(1000), nullable=False)
    language = db.Column(db.String(255), nullable=False)
    level = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    private = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.String(255), default=datetime.now().strftime("%m/%d/%Y, %H:%M:%S"))
    updated_at = db.Column(db.String(255), default=datetime.now().strftime("%m/%d/%Y, %H:%M:%S"))

    #relationship
    comments = db.relationship('Comment', backref='origin', cascade='all, delete-orphan', lazy=True)
    likes = db.relationship('Like', backref='origin_post', cascade='all, delete-orphan', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'author_id': self.author_id,
            'body': self.body,
            'language': self.language,
            'level': self.level,
            'title': self.title,
            'private': self.private,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
