from app.models import db, Event

def seed_events():
    event1 = Event(
        user_id=1,
        group_id=1,
        summary='Happy Hour',
        description='Let\'s celebrate!!',
        start_time='2022-02-28T17:00',
        end_time='2022-02-28T18:00'
    )

    db.session.add(event1)
    db.session.commit()

def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()
