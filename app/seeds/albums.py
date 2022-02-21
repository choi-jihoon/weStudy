from app.models import db, Album, Image

def seed_albums():
    album1 = Album(
        user_id=1,
        group_id=1,
        title='Handy Visualizations'
    )

    album2 = Album(
        user_id=1,
        group_id=1,
        title='Programmer Humor'
    )

    album3 = Album(
        user_id=1,
        group_id=1,
        title='Pets'
    )

    db.session.add(album1)
    db.session.add(album2)
    db.session.add(album3)


def undo_albums():
    db.session.execute('TRUNCATE albums RESTART IDENTITY CASCADE;')
    db.session.commit()
