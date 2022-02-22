from flask import Blueprint, request
from flask_login import current_user
from datetime import datetime
from app.models import db, User, Room, Chat
from app.forms import ChatForm

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}: {error}')
    return errorMessages

chat_routes = Blueprint('chats', __name__)

@chat_routes.route('/', methods=['POST'])
def create_chat():
    form = ChatForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        chat = Chat(
            user_id=current_user.get_id(),
            room_id=form['room_id'].data,
            message=form['message'].data,
            created_at=datetime.utcnow()
        )
        db.session.add(chat)
        db.session.commit()
        return chat.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# @chat_routes.route('/<int:chatId>', methods=['DELETE'])
# def delete_chat(chatId):
#     chat = Chat.query.get(chatId)
#     data = chat.to_dict()
#     db.session.delete(chat)
#     db.session.commit()
#     return data
