from app.models import db, Like, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo like, you can add other likes here if you want
def seed_likes():
    like1 = Like(
        post_id=1,
        user_id=1,
        comment_id=1,
    )
    like2 = Like(
        post_id=2,
        user_id=1,
        comment_id=1,
    )
    like3 = Like(
        post_id=3,
        user_id=1,
        comment_id=2,
    )
    like4 = Like(
        post_id=4,
        user_id=2,
        comment_id=1,
    )
    like5 = Like(
        post_id=5,
        user_id=2,
        comment_id=2,
    )
    like6 = Like(
        post_id=6,
        user_id=2,
    )
    like7 = Like(
        post_id=1,
        user_id=3,
    )
    like8 = Like(
        post_id=3,
        user_id=3,
    )
    like9 = Like(
        post_id=6,
        user_id=3,
    )
    like10 = Like(
        post_id=2,
        user_id=4,
    )
    like11 = Like(
        post_id=5,
        user_id=4,
    )
    like12 = Like(
        post_id=4,
        user_id=4,
    )
    like13 = Like(
        post_id=3,
        user_id=5,
    )
    like14 = Like(
        post_id=1,
        user_id=5,
    )
    like15 = Like(
        post_id=6,
        user_id=5,
    )
    like16 = Like(
        post_id=4,
        user_id=6,
    )
    like17 = Like(
        post_id=2,
        user_id=6
    )
    like18 = Like(
        post_id=5,
        user_id=6,
    )
    like19 = Like(
        post_id=1,
        user_id=7,
    )
    like20 = Like(
        post_id=4,
        user_id=7,
    )
    like21 = Like(
        post_id=3,
        user_id=7,
    )
    like22 = Like(
        post_id=2,
        user_id=8,
    )
    like23 = Like(
        post_id=6,
        user_id=8,
    )
    like24 = Like(
        post_id=5,
        user_id=8,
    )
    like25 = Like(
        post_id=1,
        user_id=9,
    )
    like26 = Like(
        post_id=3,
        user_id=9,
    )
    like27 = Like(
        post_id=4,
        user_id=9,
    )
    like28 = Like(
        post_id=6,
        user_id=10,
    )
    like29 = Like(
        post_id=2,
        user_id=10,
    )
    like30 = Like(
        post_id=5,
        user_id=10,
    )

    db.session.add_all([
        like1, like2, like3, like4, like5, like6,
        like7, like8, like9, like10, like11, like12,
        like13, like14, like15, like16, like17, like18,
        like19, like20, like21, like22, like23, like24,
        like25, like26, like27, like28, like29, like30
    ])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the likes table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()