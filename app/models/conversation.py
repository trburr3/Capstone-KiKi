from .db import db, environment, SCHEMA, add_prefix_for_prod


class Conversation(db.Model):
    __tablename__ = 'conversations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    archived = db.Column(db.Boolean, default=False)

    #Relationship
    messages = db.relationship('Message', backref='collection', cascade='all, delete-orphan', lazy=True)


    def to_dict(self):
        return {
            'id': self.id,
            'archived': self.archived,
        }
