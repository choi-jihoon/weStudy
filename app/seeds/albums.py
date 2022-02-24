from app.models import db, Album

def seed_albums():
    album1 = Album(
        user_id=1,
        group_id=1,
        title='Handy Visualizations'
    )

    album2 = Album(
        user_id=2,
        group_id=1,
        title='Programmer Humor'
    )

    album3 = Album(
        user_id=2,
        group_id=1,
        title='Pets'
    )

    album4 = Album(
        user_id=2,
        group_id=2,
        title='GLD Resources'
    )

    album5 = Album(
        user_id=2,
        group_id=3,
        title='SplitaBill Resources'
    )

    db.session.add(album1)
    db.session.add(album2)
    db.session.add(album3)
    db.session.add(album4)
    db.session.add(album5)
    db.session.commit()


def undo_albums():
    db.session.execute('TRUNCATE albums RESTART IDENTITY CASCADE;')
    db.session.commit()
