from flask import Blueprint, jsonify, request
from app.models.db import db
from app.models import User, Message
from flask_login import current_user, login_required
from datetime import datetime

message_routes = Blueprint('messages', __name__)

@message_routes.route('/')
@login_required
def get_all_messages():
    user_id = int(current_user.get_id())
    messages = Message.query.filter(Message.sender_id == user_id or Message.recipient_id == user_id)
    if not messages :
        return { 'errors': { 'Messages': 'No messages found.' } }, 404
    def messageNormalizer(message):
        formattedMessage: {
            'id': message.id,
            'to': User.query.get(message.recipient_id).first_name,
            'from': User.query.get(message.sender_id).first_name,
            'message': message.message,
            'updated_at': message.updated_at
        }
        return formattedMessage
    return {'Messages': [message.to_dict() for message in messages]}

@message_routes.route('/', methods=['POST'])
@login_required
def create_message():
    user_id = int(current_user.get_id())
    data = request.get_json()

    newMessage = Message(
        sender_id = user_id,
        recipient_id = data.get('recipient_id'),
        message = data.get('message')
    )

    db.session.add(newMessage)
    db.session.commit()
    return newMessage.to_dict(), 201

@message_routes.route('/<int:message_id>', methods=['PUT'])
@login_required
def edit_messages(message_id):
    message = Message.query.get(message_id)
    user_id = int(current_user.get_id())
    if not message or not message.sender_id == user_id:
        return { 'errors': { 'Message': 'No message found.' } }, 404

    data = request.get_json()
    editedMessage = data.get("message") + ' ' + '((edited))'

    message.message = editedMessage
    message.updated_at = datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
    db.session.commit()
    return message.to_dict()

@message_routes.route('/<int:message_id>', methods=['DELETE'])
@login_required
def delete_message(message_id):
    message = Message.query.get(message_id)
    user_id = int(current_user.get_id())
    if not message or not message.sender_id == user_id:
        return { 'errors': { 'Message': 'No message found.' } }, 404

    db.session.delete(message)
    db.session.commit()
    return { 'Message': 'Message successfully deleted.' }
