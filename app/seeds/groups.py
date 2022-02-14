from app.models import db, Group, User

def seed_groups():
    group1 = Group(
        group_name = 'Suhayl & Co LLC',
        description = 'The best study group to exist.'
    )

    group1_user = User.query.get(1)

    group1.users.append(group1_user)

    db.session.add(group1)
    db.session.commit()

def undo_groups():
    db.session.execute('TRUNCATE groups RESTART IDENTITY CASCADE;')
    db.session.commit()
