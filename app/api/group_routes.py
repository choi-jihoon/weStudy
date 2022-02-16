from flask import Blueprint, request
from flask_login import current_user
from app.aws_s3 import (upload_file_to_s3, allowed_file, get_unique_filename)
from app.models import db, Group, User, Room, Note
from app.forms import GroupForm, AddToGroupForm

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}: {error}')
    return errorMessages


group_routes = Blueprint('groups', __name__)


@group_routes.route('/')
def get_groups():
    user = User.query.get(current_user.get_id())
    return user.groups_to_dict()

@group_routes.route('/<int:groupId>')
def get_group(groupId):
    group = Group.query.get(int(groupId))
    return group.to_dict()


@group_routes.route('/', methods=['POST'])
def create_group():
    form = GroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form['group_image'].data:
        group_image = form['group_image'].data
        if not allowed_file(group_image.filename):
            return {'errors': 'file type not allowed'}, 400
        group_image.filename = get_unique_filename(group_image.filename)

        upload = upload_file_to_s3(group_image)

        if 'url' not in upload:
            return upload, 400

        url = upload['url']
        if form.validate_on_submit():
            group = Group(
                group_name=form['group_name'].data,
                description=form['description'].data,
                owner_id=form['owner_id'].data,
                group_image=url
            )
            group.users.append(user)
            db.session.add(group)
            db.session.commit()

            default_room1 = Room(user_id=user.id, room_name='Icebreakers', group_id=group.id)
            db.session.add(default_room1)
            db.session.commit()

            return group.to_dict()

    else:
        if form.validate_on_submit():
            user = User.query.get(current_user.get_id())
            group = Group(
                group_name=form['group_name'].data,
                description=form['description'].data,
                owner_id=form['owner_id'].data,
                group_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/956dd8e3405b4874ae587292f0609c8a.png'
                )
            group.users.append(user)
            db.session.add(group)
            db.session.commit()

            default_room1 = Room(user_id=user.id, room_name='Icebreakers', group_id=group.id)
            db.session.add(default_room1)
            db.session.commit()

            return group.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@group_routes.route('/<int:groupId>', methods=['DELETE'])
def delete_group(groupId):
    group = Group.query.get(int(groupId))
    data = group.to_dict()
    db.session.delete(group)
    db.session.commit()
    return data


@group_routes.route('/<int:groupId>', methods=['PUT'])
def edit_group(groupId):
    form = GroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        group = Group.query.get(groupId)
        group.group_name = form.data['group_name']
        group.description = form.data['description']
        db.session.commit()
        return group.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@group_routes.route('/<int:groupId>/add', methods=['PATCH'])
def add_to_group(groupId):
    form = AddToGroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        group = Group.query.get(groupId)
        user = User.query.filter(User.username == form.data['username']).first()
        group.users.append(user)
        db.session.commit()
        return group.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@group_routes.route('/<int:groupId>', methods=['PATCH'])
def join_group(groupId):
    curr_user_id = current_user.get_id()
    user = User.query.get(curr_user_id)
    group = Group.query.get(int(groupId))
    group.users.append(user)
    db.session.commit()
    return group.to_dict()


@group_routes.route('/<int:groupId>/leave', methods=['PATCH'])
def leave_group(groupId):
    curr_user_id = current_user.get_id()
    user = User.query.get(curr_user_id)
    group = Group.query.get(int(groupId))
    group.users.pop(group.users.index(user))
    db.session.commit()
    return group.to_dict()


@group_routes.route('/<int:groupId>/rooms')
def get_rooms(groupId):
    rooms = Room.query.filter(Room.group_id == groupId)
    return {'rooms': [room.to_dict() for room in rooms]}


@group_routes.route('/<int:groupId>/notes')
def get_notes(groupId):
    notes = Note.query.filter(Note.group_id == groupId)
    return  {'notes': [note.to_dict() for note in notes]}
