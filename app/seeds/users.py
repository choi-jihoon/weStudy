from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', image='https://splitabill.s3.amazonaws.com/preserve/8929d513ddd9492583b11e68e393cc3b.png')
    fiona = User(
        username='fiona', email='fiona@aa.io', password='password', image='https://splitabill.s3.amazonaws.com/preserve/5291b74b486d48b19223f3aab8097bd4.jpg')

    db.session.add(demo)
    db.session.add(fiona)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
