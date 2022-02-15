from app.models import db, Note

def seed_notes():
    note1 = Note(
        user_id = 1,
        group_id = 1,
        note_title = 'SQLAlchemy Data Types',
        note_text = 'Notes about data types in SQLAlchemy.'
    )

    db.session.add(note1)
    db.session.commit()

def undo_notes():
    db.session.execute('TRUNCATE notes RESTART IDENTITY CASCADE;')
    db.session.commit()
