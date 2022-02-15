from app.models import db, Group, User

def seed_groups():
    group1 = Group(
        group_name = 'Suhayl & Co LLC',
        description = 'The best study group to exist.',
        owner_id = 1
    )

    group2 = Group(
        group_name = 'Group 2',
        description = 'This is the description for Group 2, owned by User 2.',
        owner_id = 2
    )

    group3 = Group(
        group_name = 'Group 3',
        description = 'This is the description for Group 3, which has two users and is owned by User 1.',
        owner_id = 1
    )

    user1 = User.query.get(1)
    user2 = User.query.get(2)

    group1.users.append(user1)
    group1.users.append(user2)
    group2.users.append(user2)

    group3.users.append(user1)
    group3.users.append(user2)

    db.session.add(group1)
    db.session.add(group2)
    db.session.add(group3)
    db.session.commit()

def undo_groups():
    db.session.execute('TRUNCATE groups RESTART IDENTITY CASCADE;')
    db.session.commit()
