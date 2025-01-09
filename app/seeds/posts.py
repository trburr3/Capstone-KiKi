from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo post, you can add other posts here if you want
def seed_posts():
    post1 = Post(
        title='Post Title',
        body='This is a sample post and this is the example body of that post.',
        language='Spanish',
        level = 1,
        private = False,
        author_id = 1
        )
    post2 = Post(
        title='Post Title',
        body='This is a sample post and this is the example body of that post.',
        language='Spanish',
        level = 1,
        private = False,
        author_id = 2
        )
    post3 = Post(
        title='Post Title',
        body='This is a sample post and this is the example body of that post.',
        language='French',
        level = 1,
        author_id = 1
        )
     post4 = Post(
        title='Post Title',
        body='This is a sample post and this is the example body of that post.',
        language='French',
        level = 1,
        private = False
        author_id = 1
        )
     post5 = Post(
        title='Post Title',
        body='This is a sample post and this is the example body of that post.',
        language='Japanese',
        level = 2,
        author_id = 1
        )
     post6 = Post(
        title='Post Title',
        body='This is a sample post and this is the example body of that post.',
        language='Japanese',
        level = 3,
        private = False,
        author_id = 10
        )
     post7 = Post(
       title='Post Title',
        body='This is a sample post and this is the example body of that post.',
        language='Portuguese',
        level = 2,
        private = False,
        author_id = 12
        )
     post8 = Post(
        title='Post Title',
        body='This is a sample post and this is the example body of that post.',
        language='Portuguese',
        level = 2,
        author_id = 3
        )
     post9 = Post(
        title='Post Title',
        body='This is a sample post and this is the example body of that post.',
        language='Portuguese',
        level = 1,
        private = 'M.',
        author_id = 3
        )
     post10 = Post(
        title='Post Title',
        body='This is a sample post and this is the example body of that post.',
        language='Spanish',
        level = 1,
        private = False,
        author_id = 2
        )
     post11 = Post(
        title='Post Title',
        body='This is a sample post and this is the example body of that post.',
        language='Spanish',
        level = 2,
        private = False,
        author_id = 2
        )
     post12 = Post(
        title='Post Title',
        body='This is a sample post and this is the example body of that post.',
        language='Spanish',
        level = 3,
        private = False,
        author_id = 1
        )
     post13 = Post(
        title='Post Title',
        body='This is a sample post and this is the example body of that post.',
        language='French',
        level = 1,
        private = False,
        author_id = 5
        )
     post14 = Post(
        title='Post Title',
        body='This is a sample post and this is the example body of that post.',
        language='Sapnish',
        level = 2,
        private = False,
        author_id = 4
        )
     post15 = Post(
        title='Post Title',
        body='This is a sample post and this is the example body of that post.',
        language='Japanese',
        level = 1,
        author_id = 2
        )

    db.session.add_all([
        post1, post2, post3, post4, post5, post6,
        post7, post8, post9, post10, post11, post12,
        post13, post14, post15
    ])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the posts table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
