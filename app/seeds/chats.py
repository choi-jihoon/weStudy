from app.models import db, Chat

def seed_chats():
    chat1 = Chat(
        room_id=1,
        user_id=1,
        message='Icebreaker question: favorite coding language?'
    )

    chat2 = Chat(
        room_id=1,
        user_id=2,
        message='Definitely Python. Love me a good list comprehension.'
    )

    db.session.add(chat1)
    db.session.add(chat2)
    db.session.commit()

def undo_chats():
    db.session.execute('TRUNCATE chats RESTART IDENTITY CASCADE;')
    db.session.commit()
