from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    body = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.String(255), default=datetime.now().strftime("%m/%d/%Y, %H:%M:%S"))
    updated_at = db.Column(db.String(255), default=datetime.now().strftime("%m/%d/%Y, %H:%M:%S"))

    #relationship
    likes = db.relationship('Like', backref='origin_comment', cascade='all, delete-orphan', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'author_id': self.author_id,
            'post_id': self.post_id,
            'body': self.body,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
