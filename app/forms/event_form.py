from tabnanny import check
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from wtforms.fields.html5 import DateTimeLocalField

def check_times(form, field):
    end_time = field.data
    start_time = form.data['start_time']
    if start_time > end_time:
        raise ValidationError('End time cannot be before the start time.')

class EventForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    group_id = IntegerField('group_id', validators=[DataRequired()])
    summary = StringField('summary', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    start_time = DateTimeLocalField('start_time', format='%Y-%m-%dT%H:%M', validators=[DataRequired()])
    end_time = DateTimeLocalField('end_time', format='%Y-%m-%dT%H:%M', validators=[DataRequired(), check_times])
