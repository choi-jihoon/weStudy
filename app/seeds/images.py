from app.models import db, Image, Album

def seed_images():
    we_study_db = Image(
        user_id=2,
        album_id=1,
        study_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/8f3314f413a9419f94eb91a39982bce2.jpg'
    )

    conversion_chart = Image(
        user_id=1,
        album_id=1,
        study_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/a2ac87385bdf44d2854cfe7734e43d95.png'
    )

    meme1 = Image(
        user_id=1,
        album_id=2,
        study_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/340de1b8a1874c869c89f8c191195c7a.png'
    )

    meme2 = Image(
        user_id=2,
        album_id=2,
        study_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/4d2064e39a7342d29adfc016ccdbdc42.png'
    )

    meme3 = Image(
        user_id=1,
        album_id=2,
        study_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/eb23554fb71d4c0088644c62cedbc832.jpg'
    )

    meme4 = Image(
        user_id=1,
        album_id=2,
        study_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/f4d8a3eac1be45c5a9a5b32fb8171eb4.jpg'
    )

    db.session.add(we_study_db)
    db.session.add(conversion_chart)
    db.session.add(meme1)
    db.session.add(meme2)
    db.session.add(meme3)
    db.session.add(meme4)
    db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
