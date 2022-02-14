
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Group

class GroupForm(FlaskForm):
    group_name = StringField('group_name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
