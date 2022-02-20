from .db import db

class Album(db.Model):
    __tablename__ = 'albums'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)
    title = db.Column(db.String(40), nullable=False)

    user = db.relationship('User', back_populates='albums')
    group = db.relationship('Group', back_populates='albums')

    images = db.relationship('Image', back_populates='album', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'group_id': self.group_id,
            'title': self.title,
            'images': [image.to_dict() for image in self.images],
            'group_owner_id': self.group.owner_id
        }
