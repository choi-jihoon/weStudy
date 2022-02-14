from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Room
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


@room_routes.route('/', methods=['POST'])
def create_room():
    form = RoomForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        room = Room(user_id=current_user.get_id(), room_name=form['room_name'].data, group_id=form['group_id'].data)
        db.session.add(room)
        db.session.commit()
        return {'room': room.to_dict()}
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
