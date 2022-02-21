from app.models import db, Image, Album

def seed_images():
    we_study_db = Image(
        user_id=2,
        album_id=1,
        study_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/8f3314f413a9419f94eb91a39982bce2.jpg'
    )

    # conversion_chart = Image(
    #     user_id=1,
    #     album_id=1,
    #     study_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/a2ac87385bdf44d2854cfe7734e43d95.png'
    # )

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

    pet1 = Image(
        user_id=2,
        album_id=3,
        study_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/9b952c8cc4114f21948333f0b19a1396.jpg'
    )

    pet2 = Image(
        user_id=11,
        album_id=3,
        study_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/c3f76e1652bc40b6a528e4db77599402.jpg'
    )

    pet3 = Image(
        user_id=4,
        album_id=3,
        study_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/20a5ac67b4d2404ba0cd02579a3548bc.jpg'
    )

    pet4 = Image(
        user_id=11,
        album_id=3,
        study_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/02145931647641a39326d7017a8b0ebc.jpg'
    )

    pet5 = Image(
        user_id=10,
        album_id=3,
        study_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/86516af8cd6f4193a09b3ee98ecd43ec.jpg'
    )

    pet6 = Image(
        user_id=3,
        album_id=3,
        study_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/f7cb27c68bf14bd3abd16aad89f08051.jpg'
    )

    pet7 = Image(
        user_id=17,
        album_id=3,
        study_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/a81705be4608460b9d431c8906934df4.png'
    )

    pet8 = Image(
        user_id=3,
        album_id=3,
        study_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/40e40006b7a84653a8a55feda8deef41.jpg'
    )

    pet9 = Image(
        user_id=3,
        album_id=3,
        study_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/873020b83b07491ebff532b5bfb4fc5a.jpg'
    )

    pet10 = Image(
        user_id=11,
        album_id=3,
        study_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/c96359ec6ebb427db95a686ff8cdd7a3.jpg'
    )

    pet11 = Image(
        user_id=11,
        album_id=3,
        study_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/212924a8e34845f2b2782086fcc0235c.jpg'
    )

    pet12 = Image(
        user_id=2,
        album_id=3,
        study_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/da7429271fcd4c07bd34a740f63aa719.jpg'
    )

    pet13 = Image(
        user_id=8,
        album_id=3,
        study_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/c61cb57e89f8467194e8c3005bb7d11c.jpg'
    )

    pet14 = Image(
        user_id=8,
        album_id=3,
        study_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/ffaaed79d8d94ada813ed13be219ee6a.jpg'
    )

    gldDB = Image(
        user_id=2,
        album_id=4,
        study_image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/cb7bce8f64ef4be4adb0bb6ccd8b0366.jpg'
    )

    sabDB = Image(
        user_id=2,
        album_id=5,
        study_image='https://cdn.discordapp.com/attachments/834283703039033359/941445099097817158/splittabilldbschema.JPG'
    )

    db.session.add(we_study_db)
    # db.session.add(conversion_chart)
    db.session.add(meme1)
    db.session.add(meme2)
    db.session.add(meme3)
    db.session.add(meme4)
    db.session.add(pet1)
    db.session.add(pet2)
    db.session.add(pet3)
    db.session.add(pet4)
    db.session.add(pet5)
    db.session.add(pet6)
    db.session.add(pet7)
    db.session.add(pet8)
    db.session.add(pet9)
    db.session.add(pet10)
    db.session.add(pet11)
    db.session.add(pet12)
    db.session.add(pet13)
    db.session.add(pet14)
    db.session.add(gldDB)
    db.session.add(sabDB)
    db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
