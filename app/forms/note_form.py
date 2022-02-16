from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Note

class NoteForm(FlaskForm):
    user_id = IntegerField('user_id')
    group_id = IntegerField('group_id')
    note_title = StringField('note_title', validators=[DataRequired()])
    note_text = TextAreaField('note_text')
