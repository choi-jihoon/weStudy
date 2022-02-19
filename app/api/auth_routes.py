from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from app.aws_s3 import (upload_file_to_s3, allowed_file, get_unique_filename)

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}:{error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        user.online = True
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    user = User.query.get(current_user.get_id())
    user.online = False
    db.session.commit()
    logout_user()
    return {'message': 'User logged out'}

# @auth_routes.route('/signup', methods=['POST'])
# def sign_up():
#     """
#     Creates a new user and logs them in
#     """
#     form = SignUpForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         user = User(
#             username=form.data['username'],
#             email=form.data['email'],
#             password=form.data['password']
#         )
#         db.session.add(user)
#         db.session.commit()
#         login_user(user)
#         return user.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form["image"].data:
        image = form["image"].data
        if not allowed_file(image.filename):
            return {"errors": "file type not allowed"}, 400
        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400

        url = upload["url"]
        if form.validate_on_submit():
            user = User(
                username=form.data['username'],
                email=form.data['email'],
                password=form.data['password'],
                image=url,
                online=True
            )
            db.session.add(user)
            db.session.commit()
            login_user(user)
            return user.to_dict()
    else:
        if form.validate_on_submit():
            user = User(
                username=form.data['username'],
                email=form.data['email'],
                password=form.data['password'],
                image="https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/09fb955ae10c4aff9708b4d6293fd1d8.png",
                online=True
            )
            db.session.add(user)
            db.session.commit()
            login_user(user)
            return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401


# @auth_routes.route('/active', methods=['PATCH'])
# def set_active():
#     user = User.query.get(current_user.get_id())
#     user.online = True
