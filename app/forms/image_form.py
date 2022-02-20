from flask_wtf import FlaskForm
from wtforms import FileField, IntegerField
from wtforms.validators import DataRequired

class ImageForm(FlaskForm):
    album_id = IntegerField('album_id', validators=[DataRequired()])
    study_image = FileField('study_image')
