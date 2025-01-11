from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo comment, you can add other comments here if you want
def seed_comments():
    comment1 = Comment(
        post_id=1,
        author_id=1,
        comment='Any tips are greatly appreciated.'
    )
    comment2 = Comment(
        post_id=2,
        author_id=1,
        comment="'To be' or 'To be', what a question!"
    )
    comment3 = Comment(
        post_id=3,
        author_id=1,
        comment="English speakers often struggle with this concept, dont give up!"
    )
    comment4 = Comment(
        post_id=4,
        author_id=2,
        comment="I would be happy to help! Let's chat about it!"
    )
    comment5 = Comment(
        post_id=5,
        author_id=2,
        comment='This may sound silly, but try watching anime and pay close attention to their conjugations!'
    )
    comment6 = Comment(
        post_id=6,
        author_id=2,
        comment="Très bien!"
    )
    comment7 = Comment(
        post_id=1,
        author_id=3,
        comment="Don't worry it is never offensive to try!"
    )
    comment8 = Comment(
        post_id=3,
        author_id=3,
        comment="Being polite is different everywhere. Try to consider what it is to be polite in French and maybe that would help."
    )
    comment9 = Comment(
        post_id=6,
        author_id=3,
        comment='I can help prepare meals in the morning shift.'
    )
    comment10 = Comment(
        post_id=2,
        author_id=4,
        comment="If only Shakespeare could teach us the answers to this one."
    )
    comment11 = Comment(
        post_id=5,
        author_id=4,
        comment='I’ll bring dog shampoo and some treats for the pups!'
    )
    comment12 = Comment(
        post_id=4,
        author_id=4,
        comment='As a beginner this gets everyone, so don`t be discouraged!'
    )
    comment13 = Comment(
        post_id=3,
        author_id=5,
        comment='Formal conjugations can be such a drag, but you never forget once you master it!'
    )
    comment14 = Comment(
        post_id=1,
        author_id=5,
        comment='I had the same issue when I first started. Just keep at it!'
    )
    comment15 = Comment(
        post_id=6,
        author_id=5,
        comment="Comme c'est joli"
    )
    comment16 = Comment(
        post_id=4,
        author_id=6,
        comment="There is a similar concept in Spanish! Maybe check out some of the posts for that language for tips."
    )
    comment17 = Comment(
        post_id=2,
        author_id=6,
        comment="I know a great video series on this! Check messages I have shared it with you !"
    )
    comment18 = Comment(
        post_id=5,
        author_id=6,
        comment='So true anime and other Japanese programs actually helped me a lot! Check your messages for some recommendations! '
    )
    comment19 = Comment(
        post_id=1,
        author_id=7,
        comment="Try finding programs where you can hear people make that sound and you try to imitate them!"
    )
    comment20 = Comment(
        post_id=4,
        author_id=7,
        comment="I also need to practice this concept! DM whenever you have some time and we can work togeth on this."
    )
    comment21 = Comment(
        post_id=3,
        author_id=7,
        comment='Try thinking about scenarios where you want to give someone respect such as when speaking to someone older. That is usually when this applies.'
    )
    comment22 = Comment(
        post_id=2,
        author_id=8,
        comment='I had the same issue! Please update this post later with any resources you discover!'
    )
    comment23 = Comment(
        post_id=6,
        author_id=8,
        comment="Peux-tu m'aider avec mon écriture?"
    )
    comment24 = Comment(
        post_id=5,
        author_id=8,
        comment='Formality is hard at first when considered from as a native English Speaker. Just be patient, it will make sense with pracitce!'
    )
    comment25 = Comment(
        post_id=1,
        author_id=9,
        comment="Try watching a YouTube video on phoentics! Message me if you need suggestions."
    )
    comment26 = Comment(
        post_id=3,
        author_id=9,
        comment="I am having the same issue! Let's practice together!"
    )
    comment27 = Comment(
        post_id=4,
        author_id=9,
        comment='This topic is so confusing! Let me know when you figure it out!'
    )
    comment28 = Comment(
        post_id=6,
        author_id=10,
        comment='Moi aussi!'
    )
    comment29 = Comment(
        post_id=2,
        author_id=10,
        comment="This is one of the trickiest parts for most beginners!"
    )
    comment30 = Comment(
        post_id=5,
        author_id=10,
        comment="Good to know I am not the only one who struggles with this !"
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