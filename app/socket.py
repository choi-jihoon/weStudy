import os
from flask_socketio import SocketIO, emit

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
    emit("chat", data, broadcast=True)

# handle whiteboard drawings
@socketio.on("drawing")
def handle_draw(data):
    emit("drawing", data, broadcast=True)
