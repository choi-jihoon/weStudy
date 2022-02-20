from flask import Blueprint, request
from flask_login import current_user
from datetime import datetime
from app.models import db, Event, User
from app.forms import EventForm

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}: {error}')
    return errorMessages

event_routes = Blueprint('events', __name__)

@event_routes.route('/', methods=['POST'])
def create_event():
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        event = Event(
            user_id=current_user.get_id(),
            group_id=form['group_id'].data,
            summary=form['summary'].data,
            description=form['description'].data,
            start_time=form['start_time'].data,
            end_time=form['end_time'].data
        )
        user = User.query.get(current_user.get_id())
        db.session.add(event)
        event.attendees.append(user)
        db.session.commit()
        return event.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@event_routes.route('/<int:eventId>', methods=['DELETE'])
def delete_event(eventId):
    event = Event.query.get(int(eventId))
    data = event.to_dict()
    db.session.delete(event)
    db.session.commit()
    return data


@event_routes.route('/<int:eventId>', methods=['PUT'])
def edit_event(eventId):
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        event = Event.query.get(int(eventId))
        event.summary = form['summary'].data
        event.description = form['description'].data
        event.start_time = form['start_time'].data
        event.end_time = form['end_time'].data
        db.session.commit()
        return event.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@event_routes.route('/<int:eventId>', methods=['PATCH'])
def add_attendee(eventId):
    event = Event.query.get(int(eventId))
    user = User.query.get(current_user.get_id())
    event.attendees.append(user)
    db.session.commit()
    return event.to_dict()


@event_routes.route('/<int:eventId>/bail', methods=['PATCH'])
def remove_attendee(eventId):
    event = Event.query.get(int(eventId))
    user = User.query.get(current_user.get_id())
    event.attendees.pop(event.attendees.index(user))
    db.session.commit()
    return event.to_dict()
