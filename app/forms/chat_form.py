from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class ChatForm(FlaskForm):
    room_id = IntegerField('room_id', validators=[DataRequired()])
    message = StringField('message', validators=[DataRequired()])
