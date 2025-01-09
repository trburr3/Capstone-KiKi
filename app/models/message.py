from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    recipient_id = db.Column(db.Integer, nullable=False)
    text = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.String(255), default=datetime.now().strftime("%m/%d/%Y, %H:%M:%S"))
    updated_at = db.Column(db.String(255), default=datetime.now().strftime("%m/%d/%Y, %H:%M:%S"))

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'recipient_id': self.recipient_id,
            'message': self.message,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
