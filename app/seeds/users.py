from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', image='https://fionacapstonebucket.s3.amazonaws.com/defaults/52638a4b87654527b8fa25d13d81862a.png')
    fiona = User(
        username='FionAH', email='fiona@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/c203d7ca558d417b9aea8cd102ae32cf.jpg')
    denise = User(
        username='DAHNEEZ', email='denise@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/b43e30f40d54434e86339e63ecb88f3c.png')

    db.session.add(demo)
    db.session.add(fiona)
    db.session.add(denise)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
