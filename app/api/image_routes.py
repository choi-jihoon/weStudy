from flask import Blueprint, request
from flask_login import current_user
from app.aws_s3 import (upload_file_to_s3, allowed_file, get_unique_filename)
from app.models import db, Image
from app.forms import ImageForm

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}: {error}')
    return errorMessages

image_routes = Blueprint('images', __name__)

@image_routes.route('/', methods=['POST'])
def create_image():
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form['study_image'].data:
        study_image = form['study_image'].data
        if not allowed_file(study_image.filename):
            return {'errors': 'file type not allowed'}, 400
        study_image.filename = get_unique_filename(study_image.filename)

        upload = upload_file_to_s3(study_image)

        if 'url' not in upload:
            return upload, 400

        url = upload['url']
        if form.validate_on_submit():
            image = Image(
                user_id=current_user.get_id(),
                album_id=form['album_id'].data,
                study_image=url
            )
            db.session.add(image)
            db.session.commit()

            return image.to_dict()

    else:
        return {'errors': [{'study_image': 'Please provide a valid image.'}]}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@image_routes.route('/<int:imageId>', methods=['DELETE'])
def delete_image(imageId):
    image = Image.query.get(int(imageId))
    data = image.to_dict()
    db.session.delete(image)
    db.session.commit()
    return data
