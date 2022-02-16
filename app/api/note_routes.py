from flask import Blueprint, request
from datetime import datetime
from flask_login import current_user
from app.models import db, Note
from app.forms import NoteForm

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}: {error}')
    return errorMessages

note_routes = Blueprint('notes', __name__)


@note_routes.route('/<int:noteId>')
def get_note(noteId):
    note = Note.query.get(noteId)
    return note.to_dict()


@note_routes.route('/', methods=['POST'])
def create_note():
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        note = Note(user_id=form['user_id'].data,
                    group_id=form['group_id'].data,
                    note_title=form['note_title'].data
                    )
        db.session.add(note)
        db.session.commit()
        return note.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@note_routes.route('/<int:noteId>', methods=['PATCH'])
def edit_note(noteId):
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        note = Note.query.get(noteId)
        note.note_title = form['note_title'].data
        note.note_text = form['note_text'].data
        note.updated_at = datetime.now()
        db.session.commit()
        return note.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@note_routes.route('/<int:noteId>', methods=['DELETE'])
def delete_note(noteId):
    note = Note.query.get(noteId)
    data = note.to_dict()
    db.session.delete(note)
    db.session.commit()
    return data
