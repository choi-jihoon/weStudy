from app.models import db, Note

def seed_notes():
    note1 = Note(
        user_id = 1,
        group_id = 1,
        note_title = 'Python Lists and Tuples',
        note_text =
        """Lists
    - mutable, ordered collections (like arrays in JavaScript)
    - defined using square brackets

Tuples
    - immutable, ordered collections
    - defined using parentheses
    - sorted() will sort a tuple but return a list by default

Lists vs Tuples
    Tuples are: immutable, hashable, more memory efficient than a list
    Lists are: mutable and dynamic"""
    )

    db.session.add(note1)
    db.session.commit()

def undo_notes():
    db.session.execute('TRUNCATE notes RESTART IDENTITY CASCADE;')
    db.session.commit()
