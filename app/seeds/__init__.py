from flask.cli import AppGroup
from .users import seed_users, undo_users
from .groups import seed_groups, undo_groups
from .rooms import seed_rooms, undo_rooms
from .notes import seed_notes, undo_notes
from .chats import seed_chats, undo_chats
from .events import seed_events, undo_events
from .albums import seed_albums, undo_albums
from .images import seed_images, undo_images

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_groups()
    seed_rooms()
    seed_notes()
    seed_chats()
    seed_events()
    seed_albums()
    seed_images()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_groups()
    undo_rooms()
    undo_notes()
    undo_chats()
    undo_events()
    undo_albums()
    undo_images()
    # Add other undo functions here
