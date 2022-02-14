from .db import db

class Room(db.Model):
    __tablename__ = 'rooms'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)
    room_name = db.Column(db.String(40), nullable=False, unique=True)

    user = db.relationship('User', back_populates='rooms')
    group = db.relationship('Group', back_populates='rooms')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'group_id': self.group_id,
            'group': self.group.group_name,
            'room_name': self.room_name,
        }
