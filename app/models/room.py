from .db import db

class Room(db.Model):
    __tablename__ = 'rooms'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    room_name = db.Column(db.String(40), nullable=False, unique=True)

    user = db.relationship('User', back_populates='rooms')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'room_name': self.room_name,
        }
