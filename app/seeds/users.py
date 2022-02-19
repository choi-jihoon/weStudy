from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', image='https://fionacapstonebucket.s3.amazonaws.com/defaults/52638a4b87654527b8fa25d13d81862a.png')
    fiona = User(
        username='FionAH', email='fiona@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/c203d7ca558d417b9aea8cd102ae32cf.jpg')
    denise = User(
        username='DAHNEEZ', email='denise@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/b43e30f40d54434e86339e63ecb88f3c.png')
    peter = User(
        username='Petur', email='peter@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/46f7186126ad45de941999cc924e71be.jpg')
    suhal = User(
        username='Suhal', email='suhal@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/b050bc5ad8f84a68a29b2dcc3199e943.jpg')
    suhyl = User(
        username='Suhyl', email='suhyl@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/0b99e25c2d2149cda773f44b2010483e.jpg')
    daniel = User(
        username='Daniel', email='daniel@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/1906edadb99049cab4a59672652b27a7.png')


    db.session.add(demo)
    db.session.add(fiona)
    db.session.add(denise)
    db.session.add(peter)
    db.session.add(suhal)
    db.session.add(suhyl)
    db.session.add(daniel)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
