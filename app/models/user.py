from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .event import attendees
from .room import active_participants

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
    online = db.Column(db.Boolean, default=False)

    rooms = db.relationship('Room', back_populates='user')
    groups = db.relationship('Group', back_populates='users', secondary=study_groups)
    owned_groups = db.relationship('Group', back_populates='owner', cascade="all, delete")
    notes = db.relationship('Note', back_populates='user')
    chats = db.relationship('Chat', back_populates='user')
    events = db.relationship('Event', back_populates='user', cascade="all, delete")
    attending_events = db.relationship('Event', back_populates='attendees', secondary=attendees)
    albums = db.relationship('Album', back_populates='user', cascade='all, delete')
    images = db.relationship('Image', back_populates='user', cascade="all, delete")
    current_room = db.relationship('Room', back_populates='active_users', secondary=active_participants)
    notifications = db.relationship('Notification', back_populates='user', cascade="all, delete")


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
            'online': self.online
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
    group_image = db.Column(db.String(255))

    rooms = db.relationship('Room', back_populates='group', cascade="all, delete")
    users = db.relationship('User', back_populates='groups', secondary=study_groups)
    owner = db.relationship('User', back_populates='owned_groups')

    notes = db.relationship('Note', back_populates='group', cascade="all, delete")
    events = db.relationship('Event', back_populates='group', cascade="all, delete")
    albums = db.relationship('Album', back_populates='group', cascade="all, delete")
    notifications = db.relationship('Notification', back_populates='group', cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'group_name': self.group_name,
            'description': self.description,
            'owner_id': self.owner_id,
            'owner_name': self.owner.username,
            'group_image': self.group_image,
            'users': [user.to_dict() for user in self.users],
            'user_ids': [user.id for user in self.users],
            'notifications': [notification.to_dict() for notification in self.notifications]
        }
