from flask import Blueprint, request
from flask_login import current_user
from datetime import datetime
from app.aws_s3 import (upload_file_to_s3, allowed_file, get_unique_filename)
from app.models import db, Group, User, Room, Note, Event, Album, Notification
from app.forms import GroupForm, AddToGroupForm, RequestToJoinForm

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
    if group:
        return group.to_dict()
    else:
        return {'errors': 'Group does not exist.'}



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
            user = User.query.get(current_user.get_id())
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
                group_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/09fb955ae10c4aff9708b4d6293fd1d8.png'
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
            group = Group.query.get(groupId)
            group.group_name = form['group_name'].data
            group.description = form['description'].data
            group.group_image=url

            db.session.commit()

            return group.to_dict()

    else:
        if form.validate_on_submit():
            group = Group.query.get(groupId)
            group.group_name = form['group_name'].data
            group.description = form['description'].data

            db.session.commit()

            return group.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# @group_routes.route('/<int:groupId>', methods=['PUT'])
# def edit_group(groupId):
#     form = GroupForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         group = Group.query.get(groupId)
#         group.group_name = form.data['group_name']
#         group.description = form.data['description']
#         db.session.commit()
#         return group.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401


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


@group_routes.route('/join', methods=['PATCH'])
def request_to_join_group():
    form = RequestToJoinForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        group = Group.query.filter(Group.group_name == form.data['group_name']).first()
        curr_user_id = current_user.get_id()
        user = User.query.get(curr_user_id)
        # group.users.append(user)

        notification = Notification(
            user_id=curr_user_id,
            group_id=group.id,
            seen=False,
            created_at=datetime.utcnow(),
            message=f'{user.username} has requested to join.')

        db.session.add(notification)
        db.session.commit()
        return group.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@group_routes.route('/<int:groupId>/leave', methods=['PATCH'])
def leave_group(groupId):
    curr_user_id = current_user.get_id()
    user = User.query.get(curr_user_id)
    group = Group.query.get(int(groupId))
    group.users.pop(group.users.index(user))
    db.session.commit()
    return group.to_dict()


@group_routes.route('/<int:groupId>/remove/<int:userId>', methods=['PATCH'])
def remove_from_group(groupId, userId):
    user = User.query.get(int(userId))
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


# @group_routes.route('/<int:groupId>/photo', methods=['PATCH'])
# def update_group_photo(groupId):
#     group = Group.query.get(groupId)
#     form = UpdateImage()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     image = form["image"].data
#     if not allowed_file(image.filename):
#         return {"errors": "file type not allowed"}, 400
#     image.filename = get_unique_filename(image.filename)

#     upload = upload_file_to_s3(image)

#     if "url" not in upload:
#         return upload, 400

#     url = upload["url"]
#     if form.validate_on_submit():
#         group.group_image=url
#         db.session.commit()
#         return group.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@group_routes.route('/<int:groupId>/events')
def get_events(groupId):
    events = Event.query.filter(Event.group_id == groupId)
    return {'events': [event.to_dict() for event in events]}


@group_routes.route('/<int:groupId>/albums')
def get_albums(groupId):
    albums = Album.query.filter(Album.group_id == groupId)
    return {'albums': [album.to_dict() for album in albums]}


@group_routes.route('/<search_query>')
def search_groups(search_query):
    curr_user_id = current_user.get_id()
    curr_user = User.query.get(curr_user_id)
    groups = Group.query.filter(Group.group_name.ilike(f'{search_query}%'), Group.owner_id != curr_user_id)
    return {'groups': [group.to_dict() for group in groups if curr_user not in group.users]}


@group_routes.route('/<int:groupId>/notifications')
def get_notifications(groupId):
    notifications = Notification.query.filter(Notification.group_id == groupId)
    return {'notifications': [notification.to_dict() for notification in notifications]}
