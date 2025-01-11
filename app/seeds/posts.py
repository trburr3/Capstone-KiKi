from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo post, you can add other posts here if you want
def seed_posts():
    post1 = Post(
        title='How can I improve my pronunciation?',
        body='I have really been struggling with proper pronunciation, especially with sounds that don’t exist in English, like the rolled "r." Not only is it frustrating, but it makes everything I try to sound mildly offensive. If you have any tips, I would greatly appreciate it.',
        language='Spanish',
        level = 1,
        private = False,
        author_id = 1
        )
    post2 = Post(
        title='What’s the difference between "ser" and "estar"?',
        body='While this may seem like simple enough concept, I can seem to figure it out. The two verbs for "to be" in Spanish can be so confusing for beginners like me because they have different uses depending on context. If you have any tips or tricks on how to master this concept please let me know!',
        language='Spanish',
        level = 1,
        private = False,
        author_id = 2
        )
    post3 = Post(
        title='When do I use "tu" versus "vous"?',
        body="I know that French has both informal ('tu') and formal ('vous') forms of 'you', but I can't seem to get the difference. Like what does it really mean to formal anyway? I am open to any advice.",
        language='French',
        level = 1,
        private = False,
        author_id = 1
        )
    post4 = Post(
        title="What’s the difference between 'savoir' and 'connaître'?",
        body='These two verbs both mean "to know," but if only I knew when to use them. They are used in different contexts, but I have a hard time deciding which is most appropriate. If anyone else has felt this confusion, I would like to talk about it.',
        language='French',
        level = 1,
        private = False,
        author_id = 1
        )
    post5 = Post(
        title="What’s the difference between 'です' and 'ます'?",
        body='I know formality and manners are huge in Japanese, but I can`t wrap my head around the different polite sentence-ending forms. Like why would you want to use one over the other?',
        language='Japanese',
        level = 1,
        author_id = 1
        )
    post6 = Post(
        title='Un poème simple pour un débutant en français',
        body="""Le ciel est bleu, la mer est calme,
            Les oiseaux chantent dans le vent.
            Les fleurs s'ouvrent doucement,
            Et le jour commence lentement.""",
        language='French',
        level = 3,
        private = False,
        author_id = 10
        )
    post7 = Post(
       title='Quando eu uso "por" e quando eu uso "para"?',
        body='If both "por" and "para" can translate to "for" in English, why do we need both? Can someone explain to me the different contexts in which they are used? I have asked my friends, but they are all beginners like me.',
        language='Portuguese',
        level = 1,
        private = False,
        author_id = 12
        )
    post8 = Post(
        title='Qual é a diferença entre o pretérito perfeito e o pretérito imperfeito?',
        body='Intermediate learners often struggle with when to use the pretérito perfeito (past actions that are completed) versus the pretérito imperfeito (ongoing or habitual past actions). Trust me, I would know I was one of them last Fall. Check my bio or send me a message if you are in need of any help on this subject ',
        language='Portuguese',
        level = 2,
        author_id = 3
        )
    post9 = Post(
        title='Como eu sei quando usar "lhe" e "o/a" como pronomes de objeto direto e indireto?',
        body='The use of direct and indirect object pronouns can be tricky in Portuguese, especially with the distinction between "lhe" (indirect) and "o/a" (direct). If this is tripping you up as well, like this post and I will send you 5 tips and tricks gauranteed to make you a master!',
        language='Portuguese',
        level = 2,
        private = False,
        author_id = 3
        )
    post10 = Post(
        title='Post Title',
        body='This is a sample post and this is the example body of that post.',
        language='Spanish',
        level = 1,
        author_id = 2
        )
    post11 = Post(
        title='How can I remember vocabulary better?',
        body='Memorizing new words has been so tough! I have other students in my class how they do it, but none have been too helpful. If you know any tested techniques to help with retention, I would love to hear about them!',
        language='Spanish',
        level = 2,
        private = False,
        author_id = 2
        )
    post12 = Post(
        title='Un poema sencillo por un estudiante principiante de español',
        body="""El sol brilla en el cielo,
            las flores quieren bailar,
            el viento susurra suave,
            y la luna va a llegar.""",
        language='Spanish',
        level = 3,
        private = False,
        author_id = 1
        )
    post13 = Post(
        title='How do I know when to use the subjunctive?',
        body='What the heck is a subjunctive? I have heard the subjunctive mood is often introduced early in French (at least by good teachers anyway), but I have only started seeing it recently. Does anyone know when and why it’s used, since it doesn’t have a direct equivalent in English?',
        language='French',
        level = 1,
        private = False,
        author_id = 5
        )
    post14 = Post(
        title='Como eu uso os pronomes reflexivos corretamente?',
        body='Things are really starting to heat up ! This Spring I enrolled in Portuguese 201 and suddenly I am seeing all these reflexive verbs out of nowhere! Not to mention I am totally unsure when to use reflexive pronouns like "me," "te," "se," etc., and how they change depending on the verb or sentence structure. Send help!',
        language='Portuguese',
        level = 2,
        private = False,
        author_id = 4
        )
    post15 = Post(
        title="What’s the difference between 'ている' and 'てある'?",
        body="Here's what I do know: both expressions can describe ongoing actions or states. Here's what I don't know: when to use either! Like is 'ている' typically used for actions or conditions that are in progress, or is it 'てある'? And which one implies that the action was done intentionally?",
        language='Japanese',
        level = 2,
        private = False,
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
