from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Group, User
from app.forms import GroupForm

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
