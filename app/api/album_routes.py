from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Album
from app.forms import AlbumForm

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}: {error}')
    return errorMessages

album_routes = Blueprint('albums', __name__)
