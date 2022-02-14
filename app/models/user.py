from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

study_groups = db.Table(
    'study_group',
    db.Column('group_id', db.Integer, db.ForeignKey('groups.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(255))

    rooms = db.relationship('Room', back_populates='user')
    groups = db.relationship('Group', back_populates='users', secondary=study_groups)
    owned_groups = db.relationship('Group', back_populates='owner')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'image': self.image,
        }

    def groups_to_dict(self):
        return {
            'groups': [group.to_dict() for group in self.groups]
        }


class Group(db.Model):
    __tablename__ = 'groups'

    id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(255))
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    rooms = db.relationship('Room', back_populates='group')
    users = db.relationship('User', back_populates='groups', secondary=study_groups)
    owner = db.relationship('User', back_populates='owned_groups')

    def to_dict(self):
        return {
            'id': self.id,
            'group_name': self.group_name,
            'description': self.description,
            'owner_id': self.owner_id,
            'users': [user.to_dict() for user in self.users]
        }
