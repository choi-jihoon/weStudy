from flask_wtf import FlaskForm
from wtforms import FileField, IntegerField
from wtforms.validators import DataRequired

class ImageForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    album_id = IntegerField('album_id', validators=[DataRequired()])
    study_image = FileField('study_image')
