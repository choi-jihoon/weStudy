from datetime import datetime
from .db import db

class Notification(db.Model):
    __tablename__ = 'notifications'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)
    seen = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())
    message = db.Column(db.String, nullable=False)

    user = db.relationship('User', back_populates='notifications')
    group = db.relationship('Group', back_populates='notifications')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'username': self.user.username,
            'group_id': self.group_id,
            'seen': self.seen,
            'created_at': self.created_at,
            'message': self.message
        }
