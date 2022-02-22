from .db import db

attendees = db.Table(
    'attendee',
    db.Column('event_id', db.Integer, db.ForeignKey('events.id'), primary_key=True),
    db.Column('attendee_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)
    summary = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)

    user = db.relationship('User', back_populates='events')
    group = db.relationship('Group', back_populates='events')
    attendees = db.relationship('User', back_populates='attending_events', secondary=attendees)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'group_id': self.group_id,
            'summary': self.summary,
            'description': self.description,
            'start_time': self.start_time,
            'end_time': self.end_time,
            'attendees': [attendee.to_dict() for attendee in self.attendees],
            'attendee_names': [attendee.username for attendee in self.attendees],
            'attendee_pics': [attendee.image for attendee in self.attendees],
            'group_name': self.group.group_name,
            'group_owner_id': self.group.owner_id
        }
