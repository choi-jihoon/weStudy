from datetime import datetime

from .db import db

class Chat(db.Model):
    __tablename__ = 'chats'

    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, db.ForeignKey('rooms.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())

    user = db.relationship('User', back_populates='chats')
    room = db.relationship('Room', back_populates='chats')

    def to_dict(self):
        created_at = self.created_at.strftime("%m/%d/%Y at %I:%M:%S%p")

        return {
            'id': self.id,
            'user_id': self.user_id,
            'username': self.user.username,
            'room_id': self.room_id,
            'message': self.message,
            'created_at': self.created_at,
            'user_image': self.user.image,
        }
