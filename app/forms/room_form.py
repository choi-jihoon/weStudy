
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Room

class RoomForm(FlaskForm):
    room_name = StringField('room_name', validators=[DataRequired()])
