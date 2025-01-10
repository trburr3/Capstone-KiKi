from flask import Blueprint, jsonify, request
from app.models.db import db
from app.models import User, Request
from flask_login import current_user, login_required
from sqlalchemy import or_

request_routes = Blueprint('request', __name__)

@request_routes.route('/')
@login_required
def get_user_requests():
    user_id = int(current_user.get_id())
    allRequests = Request.query.filter(or_(Request.sender_id == user_id, Request.recipient_id == user_id))
    if not allRequests :
        return { 'errors': { 'Request': 'No request found.' } }, 404

    def requestNormalizer(request):
        formattedRequest = {
            "id": request.id,
        }
        if request.sender_id == user_id:
            formattedRequest['username'] = User.query.get(request.recipient_id).username
            formattedRequest['prof_pic'] = User.query.get(request.recipient_id).prof_pic
            formattedRequest['friend_id'] = User.query.get(request.recipient_id).id
        else:
            formattedRequest['username'] = User.query.get(request.sender_id).username
            formattedRequest['prof_pic'] = User.query.get(request.sender_id).prof_pic
            formattedRequest['friend_id'] = User.query.get(request.sender_id).id
        return formattedRequest
    return {
        'Sent': [requestNormalizer(request) for request in allRequests if request.sender_id == user_id],
        'Received':[requestNormalizer(request) for request in allRequests if request.recipient_id == user_id and request.pending == True]
    }

@request_routes.route('/', methods=['POST'])
@login_required
def create_request():
    user_id = int(current_user.get_id())
    data = request.get_json()

    newRequest = request(
        sender_id = user_id,
        recipient_id = data.get('recipient_id'),
    )

    db.session.add(newRequest)
    db.session.commit()
    return newRequest.to_dict(), 201

@request_routes.route('/<int:request_id>', methods=['PUT'])
@login_required
def edit_request(request_id):
    user_id = int(current_user.get_id())
    target_request = Request.query.get(request_id)
    if not target_request or not target_request.recipient_id == user_id:
        return { 'errors': { 'request': 'No request found.' } }, 404

    data = request.get_json()
    target_request.pending = data.get('response')

    db.session.commit()
    return target_request.to_dict()

@request_routes.route('/<int:request_id>', methods=['DELETE'])
@login_required
def delete_request(request_id):
    user_id = int(current_user.get_id())
    request = Request.query.get(request_id)
    if not request or not request.sender_id == user_id:
        return { 'errors': { 'Request': 'No request found.' } }, 404

    db.session.delete(request)
    db.session.commit()
    return { 'Request': 'Request successfully deleted.' }