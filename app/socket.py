import os
from flask_socketio import SocketIO, emit, join_room, leave_room, send

socketio = SocketIO()

# if os.environ.get("FLASK_ENV") == "production":
#     origins = [
#         "http://actual-app-url.herokuapp.com",
#         "https://actual-app-url.herokuapp.com"
#     ]
# else:
#     origins = "*"
# socketio = SocketIO(cors_allowed_origins=origins)

socketio = SocketIO(cors_allowed_origins="*")

# @socketio.on("event-type")
# def function_to_handle_event(data_included_with_event):
#     pass

# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    room = data['room']
    emit("chat", data, broadcast=True, to=room)


# handle whiteboard drawings
@socketio.on("drawing")
def handle_draw(data):
    emit("drawing", data, broadcast=True)


# handle joining chat rooms
@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', to=room)


# handle leaving chat rooms
@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)


# handle live update of login
@socketio.on('login')
def on_active(data):
    emit('login', data, broadcast=True)


# hande live update of logout
@socketio.on('logout')
def on_inactive(data):
    emit('logout', data, broadcast=True)


@socketio.on('join_room')
def on_join_room(data):
    emit('join_room', data, broadcast=True)

@socketio.on('leave_room')
def on_leave_room(data):
    emit('leave_room', data, broadcast=True)
