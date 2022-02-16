from app.models import db, Group, User

def seed_groups():
    group1 = Group(
        group_name = 'Suhayl & Co LLC',
        description = '9/20 Bootbamp Cohort',
        owner_id = 1,
        group_image = 'https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/956dd8e3405b4874ae587292f0609c8a.png'
    )

    group2 = Group(
        group_name = 'Group 2',
        description = 'This is the description for Group 2, owned by User 2.',
        owner_id = 2,
        group_image = 'https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/8251350a56de42389b48ad0f8e1153f6.png'
    )

    group3 = Group(
        group_name = 'Group 3',
        description = 'This is the description for Group 3, which has two users and is owned by User 1.',
        owner_id = 1,
        group_image ='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/25be9a2779fc414e95c6ddb04ca7a0f6.png'
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
