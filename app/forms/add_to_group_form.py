from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

def user_exists(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()
    if not user:
        raise ValidationError('User does not exist.')


class AddToGroupForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), user_exists])
