from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField
from wtforms.validators import DataRequired, Length


class GroupForm(FlaskForm):
    group_name = StringField('group_name', validators=[DataRequired(), Length(min=1, max=40, message='Group name must be less than 40 characters.')])
    description = StringField('description', validators=[DataRequired(), Length(min=1, max=255, message='Description must be less than 255 characters.')])
    owner_id = IntegerField('owner_id', validators=[DataRequired()])
    group_image = FileField('group_image')
