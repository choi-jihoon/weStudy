from flask_wtf import FlaskForm
from wtforms import FileField

class UpdateImage(FlaskForm):
    image = FileField("image")
