from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Album, Image
from app.forms import AlbumForm

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}: {error}')
    return errorMessages

album_routes = Blueprint('albums', __name__)

@album_routes.route('/<int:albumId>')
def get_album(albumId):
    album = Album.query.get(int(albumId))
    return album.to_dict()


@album_routes.route('/', methods=['POST'])
def create_album():
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        album = Album(user_id=current_user.get_id(), group_id=form['group_id'].data, title=form['title'].data)
        db.session.add(album)
        db.session.commit()
        return album.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@album_routes.route('/<int:albumId>', methods=['PUT'])
def edit_album(albumId):
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        album = Album.query.get(int(albumId))
        album.title = form['title'].data
        db.session.commit()
        return album.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@album_routes.route('/<int:albumId>', methods=['DELETE'])
def delete_album(albumId):
    album = Album.query.get(int(albumId))
    data = album.to_dict()
    db.session.delete(album)
    db.session.commit()
    return data

@album_routes.route('/<int:albumId>/images')
def get_images(albumId):
    images = Image.query.filter(Image.album_id == albumId).all()
    return {'images': [image.to_dict() for image in images]}
