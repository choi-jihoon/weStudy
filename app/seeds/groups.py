from app.models import db, Group, User

def seed_groups():
    group1 = Group(
        group_name = 'S&C LLC',
        description = '9/20 Bootbamp Cohort Study Buddies',
        owner_id = 2,
        group_image = 'https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/956dd8e3405b4874ae587292f0609c8a.png'
    )

    group2 = Group(
        group_name = 'Group Proj 1',
        description = 'Gotta Latte Do (dream team) - JavaScript / Express',
        owner_id = 1,
        group_image = 'https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/6f299160a4564f318b0d96a2c80126f8.jpg'
    )

    group3 = Group(
        group_name = 'Group Proj 2',
        description = 'SplitaBill (dream team trio) - React / Python / Flask',
        owner_id = 1,
        group_image ='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/d8a241022059400b81ca3d206ddda495.jpg'
    )

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

    user12 = User.query.get(12) # viv

    user13 = User.query.get(13) # savanah
    user14 = User.query.get(14) # tanner

    user15 = User.query.get(15) # cody

    user16 = User.query.get(16) # thien

    user17 = User.query.get(17) # jenn

    group1.users.append(user1)
    group1.users.append(user2)
    group1.users.append(user3)
    group1.users.append(user4)
    group1.users.append(user5)
    group1.users.append(user6)
    group1.users.append(user7)
    group1.users.append(user8)
    group1.users.append(user9)
    group1.users.append(user10)
    group1.users.append(user11)
    group1.users.append(user17)

    group2.users.append(user1)
    group2.users.append(user2)
    group2.users.append(user13)
    group2.users.append(user14)
    group2.users.append(user16)

    group3.users.append(user1)
    group3.users.append(user2)
    group3.users.append(user12)
    group3.users.append(user15)

    db.session.add(group1)
    db.session.add(group2)
    db.session.add(group3)
    db.session.commit()

def undo_groups():
    db.session.execute('TRUNCATE groups RESTART IDENTITY CASCADE;')
    db.session.commit()
