from .db import db, environment, SCHEMA, add_prefix_for_prod


class Friend(db.Model):
    __tablename__ = 'friends'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    recipient_id = db.Column(db.Integer, nullable=False)
    user_nickname = db.Column(db.String(255), nullable=True)
    friend_nickname = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'recipient_id': self.recipient_id,
            'message': self.message,
            'user_nickname': self.user_nickname,
            'friend_nickname': self.friend_nickname,
        }
