from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    # image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/c203d7ca558d417b9aea8cd102ae32cf.jpg'
    demo = User(
        username='Demo', email='demo@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/09fb955ae10c4aff9708b4d6293fd1d8.png')
    fiona = User(
        username='FionAH', email='fiona@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/a2dc96297ad8452980d273e1f6571c35.jpg')
    denise = User(
        username='DAHNEEZ', email='denise@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/b43e30f40d54434e86339e63ecb88f3c.png')
    peter = User(
        username='petur', email='peter@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/46f7186126ad45de941999cc924e71be.jpg')
    suhal = User(
        username='Suhal', email='suhal@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/b050bc5ad8f84a68a29b2dcc3199e943.jpg')
    suhyl = User(
        username='Suhyl', email='suhyl@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/0b99e25c2d2149cda773f44b2010483e.jpg')
    daniel = User(
        username='Daniel', email='daniel@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/1906edadb99049cab4a59672652b27a7.png')
    christy = User(
        username='chrithy', email='christy@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/7b9abb06cf8a403f947a58eb8793ab8f.jpg')
    justin = User(
        username='jstnswn', email='justin@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/effec2ca509045a8b356e543a03bfd48.jpg')
    cameron = User(
        username='Cameroff', email='cameron@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/269908bae471414aba9186107cc35707.jpg')
    yura = User(
        username='Yu Ra', email='yura@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/c9715159a57e4942a6d80863003e9061.jpg')

    viv = User(
        username='BobaGuardian', email='vivian@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/65fb2811209a45af9832b58b0e0e01dc.png')


    savanah = User(
        username='savnaha', email='savanah@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/f3eb431407724f1280609dd53c39632a.jpg')

    tanner = User(
        username='tantan', email='tanner@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/052735d5f6844bc581f223553c96aac0.png')

    cody = User(
        username='pal_drogo', email='cody@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/935cb05656104cfb96a744c66b5501b7.jpeg')

    thien = User(
        username='10/thien', email='thien@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/b2c0f85208c84537bd1c47db94e3dee7.png')

    jenn = User(
        username='JennD', email='jenn@aa.io', password='password', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/9853599404df48929054ee38954ff769.jpeg')

    db.session.add(demo)
    db.session.add(fiona)
    db.session.add(denise)
    db.session.add(peter)
    db.session.add(suhal)
    db.session.add(suhyl)
    db.session.add(daniel)
    db.session.add(christy)
    db.session.add(justin)
    db.session.add(cameron)
    db.session.add(yura)

    db.session.add(viv)

    db.session.add(savanah)
    db.session.add(tanner)

    db.session.add(cody)

    db.session.add(thien)
    db.session.add(jenn)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
