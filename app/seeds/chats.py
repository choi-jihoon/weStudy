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

    chat3 = Chat(
        room_id=2,
        user_id=2,
        message="Here's a neat resource for implementing Flask-SocketIO!:"
    )

    chat4 = Chat(
        room_id=2,
        user_id=2,
        message="https://flask-socketio.readthedocs.io/en/latest/#rooms"
    )

    db.session.add(chat1)
    db.session.add(chat2)
    db.session.add(chat3)
    db.session.add(chat4)
    db.session.commit()

def undo_chats():
    db.session.execute('TRUNCATE chats RESTART IDENTITY CASCADE;')
    db.session.commit()
