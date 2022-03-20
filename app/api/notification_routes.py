from flask import Blueprint, request
from flask_login import current_user
from datetime import datetime
from app.models import db, Notification, Group, User
from app.forms import AddToGroupForm

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}: {error}')
    return errorMessages

notification_routes = Blueprint('notifications', __name__)

@notification_routes.route('/<int:notificationId>/accept', methods=['PATCH'])
def accept_request(notificationId):
    form = AddToGroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        notification = Notification.query.get(int(notificationId))
        group = Group.query.get(form.data['group_id'])
        user = User.query.filter(User.username == form.data['username']).first()
        group.users.append(user)
        notification.seen = True
        data = notification.to_dict()
        db.session.delete(notification)
        db.session.commit()
        return {'notification': data, 'group': group.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@notification_routes.route('/<int:notificationId>/reject', methods=['PATCH'])
def reject_request(notificationId):
    notification = Notification.query.get(int(notificationId))
    # notification.seen = True
    data = notification.to_dict()
    db.session.delete(notification)
    db.session.commit()
    return data
