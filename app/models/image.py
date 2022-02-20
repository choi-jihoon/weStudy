from .db import db

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'), nullable=False)
    study_image = db.Column(db.String(255))

    user = db.relationship('User', back_populates='images')
    album = db.relationship('Album', back_populates='images')

    def to_dict(self):
        return {
            'id': self.id,
            'album_id': self.album_id,
            'user_id': self.user_id,
            'study_image': self.study_image
        }
