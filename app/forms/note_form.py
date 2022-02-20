from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, StringField
from wtforms.validators import DataRequired, Length
from app.models import Note

class NoteForm(FlaskForm):
    user_id = IntegerField('user_id')
    group_id = IntegerField('group_id')
    note_title = StringField('note_title', validators=[DataRequired(), Length(min=1, max=40, message="Note title must be less than 40 characters.")])
    note_text = TextAreaField('note_text')
