from app.models import db, Friend, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo friend, you can add other friends here if you want
def seed_friends():
    friend1 = Friend(
        friend_id=20,
        user_id=1,
    )
    friend2 = Friend(
        friend_id=15,
        user_id=1,
    )
    friend3 = Friend(
        friend_id=14,
        user_id=1,
    )
    friend4 = Friend(
        friend_id=5,
        user_id=2,
    )
    friend5 = Friend(
        friend_id=6,
        user_id=2,
    )
    friend6 = Friend(
        friend_id=7,
        user_id=2,
    )
    friend7 = Friend(
        friend_id=8,
        user_id=3,
    )
    friend8 = Friend(
        friend_id=9,
        user_id=3,
    )
    friend9 = Friend(
        friend_id=16,
        user_id=3,
    )
    friend10 = Friend(
        friend_id=12,
        user_id=4,
    )
    friend11 = Friend(
        friend_id=5,
        user_id=4,
    )
    friend12 = Friend(
        friend_id=4,
        user_id=4,
    )
    friend13 = Friend(
        friend_id=3,
        user_id=5,
    )
    friend14 = Friend(
        friend_id=1,
        user_id=5,
    )
    friend15 = Friend(
        friend_id=6,
        user_id=5,
    )
    friend16 = Friend(
        friend_id=4,
        user_id=6,
    )
    friend17 = Friend(
        friend_id=2,
        user_id=6
    )
    friend18 = Friend(
        friend_id=5,
        user_id=6,
    )
    friend19 = Friend(
        friend_id=1,
        user_id=7,
    )
    friend20 = Friend(
        friend_id=4,
        user_id=7,
    )
    friend21 = Friend(
        friend_id=3,
        user_id=7,
    )
    friend22 = Friend(
        friend_id=2,
        user_id=8,
    )
    friend23 = Friend(
        friend_id=6,
        user_id=8,
    )
    friend24 = Friend(
        friend_id=5,
        user_id=8,
    )
    friend25 = Friend(
        friend_id=1,
        user_id=9,
    )
    friend26 = Friend(
        friend_id=3,
        user_id=9,
    )
    friend27 = Friend(
        friend_id=4,
        user_id=9,
    )
    friend28 = Friend(
        friend_id=6,
        user_id=10,
    )
    friend29 = Friend(
        friend_id=2,
        user_id=10,
    )
    friend30 = Friend(
        friend_id=5,
        user_id=10,
    )

    db.session.add_all([
        friend1, friend2, friend3, friend4, friend5, friend6,
        friend7, friend8, friend9, friend10, friend11, friend12,
        friend13, friend14, friend15, friend16, friend17, friend18,
        friend19, friend20, friend21, friend22, friend23, friend24,
        friend25, friend26, friend27, friend28, friend29, friend30
    ])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the friends table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends"))

    db.session.commit()