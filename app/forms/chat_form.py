from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class ChatForm(FlaskForm):
    room_id = IntegerField('room_id', validators=[DataRequired()])
    message = StringField('message', validators=[DataRequired(), Length(min=1, max=500, message="Message must be less than 500 characters long.")])
