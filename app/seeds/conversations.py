from app.models import db, Conversation, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo conversation, you can add other conversations here if you want
def seed_conversations():
    conversation1 = Conversation(
        archived=False
    )
    conversation2 = Conversation(
        archived=False
    )
    conversation3 = Conversation(
        archived=False
    )
    conversation4 = Conversation(
        archived=False
    )
    conversation5 = Conversation(
        archived=False
    )
    conversation6 = Conversation(
       archived=False
    )
    conversation7 = Conversation(
        archived=False
    )
    conversation8 = Conversation(
        archived=False
    )
    conversation9 = Conversation(
        archived=False
    )
    conversation10 = Conversation(
        archived=False
    )
    conversation11 = Conversation(
        archived=False
    )
    conversation12 = Conversation(
        archived=False
    )
    conversation13 = Conversation(
        archived=False
    )
    conversation14 = Conversation(
        archived=False
    )
    conversation15 = Conversation(
        archived=False
    )
    conversation16 = Conversation(
        archived=False
    )
    conversation17 = Conversation(
        archived=False
    )
    conversation18 = Conversation(
        archived=True
    )
    conversation19 = Conversation(
        archived=False
    )
    conversation20 = Conversation(
        archived=False
    )


    db.session.add_all([
        conversation1, conversation2, conversation3, conversation4, conversation5, conversation6,
        conversation7, conversation8, conversation9, conversation10, conversation11, conversation12,
        conversation13, conversation14, conversation15, conversation16, conversation17, conversation18,
        conversation19, conversation20,
    ])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the conversations table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_conversations():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.conversations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM conversations"))

    db.session.commit()