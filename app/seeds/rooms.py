from app.models import db, Room

def seed_rooms():
    room1 = Room(
        room_name='Lounge',
        user_id=1,
        group_id=1
    )

    room2 = Room(
        room_name='Quiet Study',
        user_id=2,
        group_id=1
    )

    db.session.add(room1)
    db.session.add(room2)

    db.session.commit()

def undo_rooms():
    db.session.execute('TRUNCATE rooms RESTART IDENTITY CASCADE;')
    db.session.commit()
