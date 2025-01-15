from flask import Blueprint, jsonify, request
from app.models.db import db
from app.models import User, Message, Conversation
from flask_login import current_user, login_required
from datetime import datetime
from sqlalchemy import or_

conversation_routes = Blueprint('conversations', __name__)

def messageNormalizer(message):
    formattedMessage = {
    'id': message.id,
    'to': User.query.get(message.recipient_id).first_name,
    'from': User.query.get(message.sender_id).first_name,
    'sender_pic': User.query.get(message.sender_id).prof_pic,
    'message': message.message,
    'updated_at': message.updated_at
    }
    return formattedMessage

def conversationNormalizer(conversation):
    messages = Message.query.filter(Message.conversation_id == conversation.id)
    if conversation.user_one == int(current_user.get_id()):
        friend_pic = User.query.get(conversation.user_two).prof_pic
    friend_pic = User.query.get(conversation.user_one).prof_pic
    formattedConversation = {
        'id':conversation.id,
        'between': [User.query.get(conversation.user_one).first_name, User.query.get(conversation.user_two).first_name ],
        'user_one': conversation.user_one,
        'user_two': conversation.user_two,
        'friend_pic': friend_pic,
        'messages': [messageNormalizer(message) for message in messages],
        'archived': conversation.archived
    }
    return formattedConversation

@conversation_routes.route('/')
@login_required
def get_all_conversations():
    user_id = int(current_user.get_id())
    conversations = Conversation.query.filter(or_(Conversation.user_one == user_id, Conversation.user_two == user_id))
    if not conversations :
        return { 'errors': { 'Conversations': 'No conversations found.' } }, 404
    return {'Conversations': [conversationNormalizer(conversation) for conversation in conversations]}

@conversation_routes.route('/', methods=['POST'])
@login_required
def create_conversation():
    user_id = int(current_user.get_id())
    data = request.get_json()

    newConversation = conversation(
        user_one = user_id,
        user_two = data.get('recipient_id'),
    )

    db.session.add(newConversation)
    db.session.commit()
    return newConversation.to_dict(), 201

@conversation_routes.route('/<int:conversation_id>', methods=['DELETE'])
@login_required
def delete_conversation(conversation_id):
    conversation = Conversation.query.get(conversation_id)
    user_id = int(current_user.get_id())
    if not conversation:
        return { 'errors': { 'Conversation': 'No conversation found.' } }, 404

    db.session.delete(conversation)
    db.session.commit()
    return { 'Conversation': 'Conversation successfully deleted.' }

@conversation_routes.route('/<int:conversation_id>', methods=['PUT'])
@login_required
def edit_conversations(conversation_id):
    conversation = conversation.query.get(conversation_id)
    user_id = int(current_user.get_id())
    if not conversation:
        return { 'errors': { 'conversation': 'No conversation found.' } }, 404

    data = request.get_json()
    conversation.archived = data.get("archived")
    db.session.commit()
    return conversation.to_dict()


@conversation_routes.route('/<int:conversation_id>/messages')
@login_required
def get_all_messages(conversation_id):
    user_id = int(current_user.get_id())
    messages = Message.query.filter(Message.conversation_id == conversation_id)
    if not messages :
        return { 'errors': { 'Messages': 'No messages found.' } }, 404
    return {'Messages': [messageNormalizer(message) for message in messages]}

@conversation_routes.route('/<int:conversation_id>/messages', methods=['POST'])
@login_required
def create_message(conversation_id):
    user_id = int(current_user.get_id())
    data = request.get_json()

    newMessage = Message(
        sender_id = user_id,
        recipient_id = data.get('recipient_id'),
        message = data.get('message'),
        conversation_id = conversation_id
    )

    db.session.add(newMessage)
    db.session.commit()
    return newMessage.to_dict(), 201

@conversation_routes.route('/<int:conversation_id>/messages/<int:message_id>', methods=['PUT'])
@login_required
def edit_messages(conversation_id, message_id):
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

@conversation_routes.route('/<int:conversation_id>/messages/<int:message_id>', methods=['DELETE'])
@login_required
def delete_message(conversation_id, message_id):
    message = Message.query.get(message_id)
    user_id = int(current_user.get_id())
    if not message or not message.sender_id == user_id:
        return { 'errors': { 'Message': 'No message found.' } }, 404

    db.session.delete(message)
    db.session.commit()
    return { 'Message': 'Message successfully deleted.' }
