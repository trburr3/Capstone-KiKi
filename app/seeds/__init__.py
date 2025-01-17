from flask.cli import AppGroup
from .users import seed_users, undo_users
from .messages import seed_messages, undo_messages
from .requests import seed_requests, undo_requests
from .friends import seed_friends, undo_friends
from .comments import seed_comments, undo_comments
from .posts import seed_posts, undo_posts
from .likes import seed_likes, undo_likes
from .conversations import seed_conversations, undo_conversations

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_conversations()
        undo_messages()
        undo_requests()
        undo_posts()
        undo_friends()
        undo_comments()
        undo_likes()
    seed_users()
    seed_conversations()
    seed_messages()
    seed_requests()
    seed_posts()
    seed_friends()
    seed_comments()
    seed_likes()



# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_messages()
    undo_requests()
    undo_friends()
    undo_comments()
    undo_posts()
    undo_likes()
    undo_conversations()
