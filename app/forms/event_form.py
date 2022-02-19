from tokenize import String
from xmlrpc.client import DateTime
from flask import Flask
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, ValidationError

class EventForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    group_id = IntegerField('group_id', validators=[DataRequired()])
    summary = StringField('summary', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    start_time = DateTimeField('start_time', validators=[DataRequired()])
    end_time = DateTimeField('end_time', validators=[DataRequired()])
