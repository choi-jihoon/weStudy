from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, Length

class AlbumForm(FlaskForm):
    group_id = IntegerField('group_id', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired(), Length(min=1, max=40, message='Album title must be less than 40 characters.')])
