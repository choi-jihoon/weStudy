from app.models import db, Event, User

def seed_events():
    event1 = Event(
        user_id=1,
        group_id=1,
        summary='Happy Hour',
        description='Let\'s celebrate!!',
        start_time='2022-02-28T17:00',
        end_time='2022-02-28T18:00'
    )

    event2 = Event(
        user_id=1,
        group_id=1,
        summary='Post a/A Grad Party',
        description='Whiteboarding DS&A, anyone?',
        start_time='2022-03-12T17:00',
        end_time='2022-03-12T20:00'
    )

    event3 = Event(
        user_id=2,
        group_id=2,
        summary='Presentations',
        description='Our first group project presentation!',
        start_time='2021-12-27T08:30',
        end_time='2021-12-27T11:15'
    )

    event4 = Event(
        user_id=2,
        group_id=3,
        summary='Presentations',
        description='Presenting SplitaBill!',
        start_time='2022-02-14T08:30',
        end_time='2022-02-14T11:15'
    )

    db.session.add(event1)
    db.session.add(event2)
    db.session.add(event3)
    db.session.add(event4)
    db.session.commit()

    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)
    user4 = User.query.get(4)
    user5 = User.query.get(5)
    user6 = User.query.get(6)
    user7 = User.query.get(7)
    user8 = User.query.get(8)
    user9 = User.query.get(9)
    user10 = User.query.get(10)
    user11 = User.query.get(11)
    user17 = User.query.get(17)
    user16 = User.query.get(16)

    user13 = User.query.get(13)
    user12 = User.query.get(12)
    user14 = User.query.get(14)

    user15 = User.query.get(15)

    event1.attendees.append(user1)
    event1.attendees.append(user2)
    event1.attendees.append(user3)
    event1.attendees.append(user4)
    event1.attendees.append(user5)
    event1.attendees.append(user6)
    event1.attendees.append(user7)
    event1.attendees.append(user8)
    event1.attendees.append(user9)
    event1.attendees.append(user10)
    event1.attendees.append(user11)
    event1.attendees.append(user17)

    event2.attendees.append(user1)
    event2.attendees.append(user2)

    event3.attendees.append(user2)
    event3.attendees.append(user13)
    event3.attendees.append(user14)
    event3.attendees.append(user16)

    event4.attendees.append(user2)
    event4.attendees.append(user12)
    event4.attendees.append(user15)
    db.session.commit()


def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()
