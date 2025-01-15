from app.models import db, Conversation, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo conversation, you can add other conversations here if you want
def seed_conversations():
    conversation1 = Conversation(
        archived=False,
        user_one=1,
        user_two=2
    )
    conversation2 = Conversation(
        archived=False,
        user_one=3,
        user_two=1
    )
    conversation3 = Conversation(
        archived=False,
        user_one=4,
        user_two=2
    )
    conversation4 = Conversation(
        archived=False,
        user_one=5,
        user_two=2
    )
    conversation5 = Conversation(
        archived=False,
        user_one=6,
        user_two=2
    )
    conversation6 = Conversation(
       archived=False,
       user_one=6,
       user_two=3
    )
    conversation7 = Conversation(
        archived=False,
        user_one=5,
        user_two=4
    )
    conversation8 = Conversation(
        archived=False,
        user_one=3,
        user_two=5
    )
    conversation9 = Conversation(
        archived=False,
        user_one=1,
        user_two=5
    )
    conversation10 = Conversation(
        archived=False,
        user_one=6,
        user_two=5
    )
    conversation11 = Conversation(
        archived=False,
        user_one=4,
        user_two=6
    )
    conversation12 = Conversation(
        archived=False,
        user_one=1,
        user_two=7
    )
    conversation13 = Conversation(
        archived=False,
        user_one=4,
        user_two=7
    )
    conversation14 = Conversation(
        archived=False,
        user_one=3,
        user_two=7
    )
    conversation15 = Conversation(
        archived=False,
        user_one=2,
        user_two=8
    )
    conversation16 = Conversation(
        archived=False,
        user_one=6,
        user_two=8
    )
    conversation17 = Conversation(
        archived=False,
        user_one=5,
        user_two=8
    )
    conversation18 = Conversation(
        archived=True,
        user_one=1,
        user_two=8
    )
    conversation19 = Conversation(
        archived=False,
        user_one=3,
        user_two=9
    )
    conversation20 = Conversation(
        archived=False,
        user_one=4,
        user_two=9
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