from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import User, Group

def user_exists(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()
    if not user:
        raise ValidationError('User does not exist.')

def user_already_in_group(form, field):
    username = field.data
    group_id = form.data['group_id']
    group = Group.query.get(int(group_id))
    user = User.query.filter(User.username == username).first()
    if user in group.users:
        raise ValidationError('User already in group.')

class AddToGroupForm(FlaskForm):
    group_id = IntegerField('group_id', validators=[DataRequired()])
    username = StringField('username', validators=[DataRequired(), user_exists, user_already_in_group])
