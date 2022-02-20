from datetime import datetime

from .db import db

class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)
    note_title = db.Column(db.String(40), nullable=False)
    note_text = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.utcnow())

    user = db.relationship('User', back_populates='notes')
    group = db.relationship('Group', back_populates='notes')

    def to_dict(self):
        created_at = self.created_at.strftime("%m/%d/%Y at %I:%M:%S%p")
        updated_at = self.updated_at.strftime("%m/%d/%Y at %I:%M:%S%p")

        return {
            'id': self.id,
            'user_id': self.user_id,
            'group_id': self.group_id,
            'note_title': self.note_title,
            'note_text': self.note_text,
            'user': self.user.username,
            'created_at': created_at,
            'updated_at': updated_at
        }
