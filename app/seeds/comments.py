from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo comment, you can add other comments here if you want
def seed_comments():
    comment1 = Comment(
        post_id=1,
        author_id=1,
        comment='Does anyone want to carpool to the beach cleanup this weekend?'
    )
    comment2 = Comment(
        post_id=2,
        author_id=1,
        comment="I’ll bring some extra gloves and trash bags for the cleanup!"
    )
    comment3 = Comment(
        post_id=3,
        author_id=1,
        comment="Let’s meet at the entrance by 8:00 AM to get started!"
    )
    comment4 = Comment(
        post_id=4,
        author_id=2,
        comment="The toy drive is coming up soon! Who’s bringing toys?"
    )
    comment5 = Comment(
        post_id=5,
        author_id=2,
        comment='I can contribute board games and stuffed animals.'
    )
    comment6 = Comment(
        post_id=6,
        author_id=2,
        comment="Let’s sort the toys into age-appropriate groups on the event day."
    )
    comment7 = Comment(
        post_id=1,
        author_id=3,
        comment='Is everyone ready to help at the soup kitchen this week?'
    )
    comment8 = Comment(
        post_id=3,
        author_id=3,
        comment="I’ll take care of the serving line. Let’s coordinate tasks."
    )
    comment9 = Comment(
        post_id=6,
        author_id=3,
        comment='I can help prepare meals in the morning shift.'
    )
    comment10 = Comment(
        post_id=2,
        author_id=4,
        comment="The puppy car wash is set for Saturday! Don’t forget your towels!"
    )
    comment11 = Comment(
        post_id=5,
        author_id=4,
        comment='I’ll bring dog shampoo and some treats for the pups!'
    )
    comment12 = Comment(
        post_id=4,
        author_id=4,
        comment='Let’s set up a photo booth to help promote adoptions.'
    )
    comment13 = Comment(
        post_id=3,
        author_id=5,
        comment='Are we all set for the Helping Hands event next week?'
    )
    comment14 = Comment(
        post_id=1,
        author_id=5,
        comment='I’ve arranged for some supplies. Let me know what else we need.'
    )
    comment15 = Comment(
        post_id=6,
        author_id=5,
        comment="I can assist with heavy lifting and setting up equipment."
    )
    comment16 = Comment(
        post_id=4,
        author_id=6,
        comment="The Kids Theatre program is next month. Who’s helping with rehearsals?"
    )
    comment17 = Comment(
        post_id=2,
        author_id=6,
        comment="I can assist with costume design and stage setup."
    )
    comment18 = Comment(
        post_id=5,
        author_id=6,
        comment='I’ll help the kids practice their lines and gestures.'
    )
    comment19 = Comment(
        post_id=1,
        author_id=7,
        comment="The garden cleanup is this weekend. Don’t forget sunscreen!"
    )
    comment20 = Comment(
        post_id=4,
        author_id=7,
        comment="I’ll bring refreshments and snacks for everyone!"
    )
    comment21 = Comment(
        post_id=3,
        author_id=7,
        comment='I’ll handle coordinating the trash disposal afterward.'
    )
    comment22 = Comment(
        post_id=2,
        author_id=8,
        comment='We’re planning activities for the senior center. Ideas?'
    )
    comment23 = Comment(
        post_id=6,
        author_id=8,
        comment='How about a trivia contest or a storytelling session?'
    )
    comment24 = Comment(
        post_id=5,
        author_id=8,
        comment='Great idea! I can bring some materials for the trivia game.'
    )
    comment25 = Comment(
        post_id=1,
        author_id=9,
        comment="We’re assembling hygiene kits this Friday. Anyone bringing supplies?"
    )
    comment26 = Comment(
        post_id=3,
        author_id=9,
        comment="I’ll bring toothbrushes, toothpaste, and deodorants."
    )
    comment27 = Comment(
        post_id=4,
        author_id=9,
        comment='I’ll pack everything into the kits on the event day.'
    )
    comment28 = Comment(
        post_id=6,
        author_id=10,
        comment='The blood donation drive needs more volunteers. Who’s available?'
    )
    comment29 = Comment(
        post_id=2,
        author_id=10,
        comment="I’ll be there. Let’s coordinate the registration process."
    )
    comment30 = Comment(
        post_id=5,
        author_id=10,
        comment="Don’t forget to eat a light meal before donating!"
    )

    db.session.add_all([
        comment1, comment2, comment3, comment4, comment5, comment6,
        comment7, comment8, comment9, comment10, comment11, comment12,
        comment13, comment14, comment15, comment16, comment17, comment18,
        comment19, comment20, comment21, comment22, comment23, comment24,
        comment25, comment26, comment27, comment28, comment29, comment30
    ])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the comments table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()