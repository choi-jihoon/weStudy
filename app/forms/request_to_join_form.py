from tokenize import String
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import User, Group

def group_exists(form, field):
    group_name = field.data
    group = Group.query.filter(Group.group_name == group_name).first()
    if not group:
        raise ValidationError('Group does not exist.')

def user_already_in_group(form, field):
    group_name = field.data
    user_id = form.data['user_id']
    group = Group.query.filter(Group.group_name == group_name).first()
    user = User.query.get(user_id)
    if group and user in group.users:
        raise ValidationError('You already belong to that group.')

class RequestToJoinForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    group_name = StringField('group_name', validators=[DataRequired(), group_exists, user_already_in_group])
