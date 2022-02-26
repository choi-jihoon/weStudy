from .db import db

active_participants = db.Table(
    'active_participant',
    db.Column('room_id', db.Integer, db.ForeignKey('rooms.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)

class Room(db.Model):
    __tablename__ = 'rooms'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)
    room_name = db.Column(db.String(40), nullable=False)

    user = db.relationship('User', back_populates='rooms', foreign_keys=[user_id])
    group = db.relationship('Group', back_populates='rooms')
    chats = db.relationship('Chat', back_populates='room', cascade="all, delete")
    active_users = db.relationship('User', back_populates='current_room', secondary=active_participants)


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'group_id': self.group_id,
            'group': self.group.group_name,
            'room_name': self.room_name,
            'chats': [chat.to_dict() for chat in self.chats],
            'group_owner_id': self.group.owner_id,
            'active_users': [user.to_dict() for user in self.active_users]
        }
