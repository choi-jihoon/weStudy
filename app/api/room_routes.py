from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Room, Chat, User
from app.forms import RoomForm

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}: {error}')
    return errorMessages

room_routes = Blueprint('rooms', __name__)

@room_routes.route('/<int:roomId>')
def get_room(roomId):
    room = Room.query.get(roomId)
    return room.to_dict()


@room_routes.route('/', methods=['POST'])
def create_room():
    form = RoomForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        room = Room(user_id=current_user.get_id(), room_name=form['room_name'].data, group_id=form['group_id'].data)
        db.session.add(room)
        db.session.commit()
        return room.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@room_routes.route('/<int:roomId>', methods=['PATCH'])
def edit_room(roomId):
    form = RoomForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        room = Room.query.get(int(roomId))
        room.room_name = form.data['room_name']
        db.session.commit()
        return room.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@room_routes.route('/<int:roomId>', methods=['DELETE'])
def delete_room(roomId):
    room = Room.query.get(int(roomId))
    data = room.to_dict()
    db.session.delete(room)
    db.session.commit()
    return data


@room_routes.route('/<int:roomId>/chats')
def get_chats(roomId):
    chats = Chat.query.filter(Chat.room_id == roomId).all()
    return { 'chats': [chat.to_dict() for chat in chats] }


@room_routes.route('/<int:roomId>/join', methods=['PATCH'])
def join_chatroom(roomId):
    room = Room.query.get(int(roomId))
    user = User.query.get(current_user.get_id())
    room.active_users.append(user)
    db.session.commit()
    return room.to_dict()


@room_routes.route('/<int:roomId>/leave', methods=['PATCH'])
def leave_chatroom(roomId):
    room = Room.query.get(int(roomId))
    user = User.query.get(current_user.get_id())
    room.active_users.pop(room.active_users.index(user))
    db.session.commit()
    return room.to_dict()
