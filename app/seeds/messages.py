from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo message, you can add other messages here if you want
def seed_messages():
    message1 = Message(
        sender_id=1,
        recipient_id=2,
        message='Hey, my name is Chuck E. nice to meet you! Would you like to be friends?'
    )
    message2 = Message(
        sender_id=2,
        recipient_id=1,
        message="Nice to meet you Chuck E.! How long have you been a learner?"
    )
    message3 = Message(
        sender_id=3,
        recipient_id=1,
        message="I liked your post! Have you been able to find a strategy that works for you?"
    )
    message4 = Message(
        sender_id=4,
        recipient_id=2,
        message="Hi, would you like to be friends?"
    )
    message5 = Message(
        sender_id=5,
        recipient_id=2,
        message='Thank you for commenting on my post, it helped a lot!'
    )
    message6 = Message(
        sender_id=6,
        recipient_id=2,
        message="I am learning about the preterite today, would you mind helping me out?"
    )
    message7 = Message(
        sender_id=1,
        recipient_id=3,
        message='Not yet, any suggestions?'
    )
    message8 = Message(
        sender_id=3,
        recipient_id=1,
        message="I know just the thing! Let me share some resources with you."
    )
    message9 = Message(
        sender_id=6,
        recipient_id=3,
        message='Great post yesterday! That question saved my life.'
    )
    message10 = Message(
        sender_id=2,
        recipient_id=4,
        message="Absolutely send me a request!"
    )
    message11 = Message(
        sender_id=5,
        recipient_id=4,
        message='I see that we are similar levels would you like to study together?'
    )
    message12 = Message(
        sender_id=4,
        recipient_id=5,
        message="Of course let's arrange a time!"
    )
    message13 = Message(
        sender_id=3,
        recipient_id=5,
        message='Have you been able to solve your problem?'
    )
    message14 = Message(
        sender_id=1,
        recipient_id=5,
        message='Hey, I need someone to practcie my pronunciation with are you available?'
    )
    message15 = Message(
        sender_id=6,
        recipient_id=5,
        message="I see that you are learning something similar to me. Let's be friends !"
    )
    message16 = Message(
        sender_id=4,
        recipient_id=6,
        message="Hi, how are you ?"
    )
    message17 = Message(
        sender_id=2,
        recipient_id=6,
        message="Sure thing! I would be happy to!"
    )
    message18 = Message(
        sender_id=5,
        recipient_id=6,
        message='For sure! Check your requests.'
    )
    message19 = Message(
        sender_id=1,
        recipient_id=7,
        message="I saw your post and know an awesome quizlet if you need it !"
    )
    message20 = Message(
        sender_id=4,
        recipient_id=7,
        message="Hi, how are you ?"
    )
    message21 = Message(
        sender_id=3,
        recipient_id=7,
        message='I’ll handle coordinating the trash disposal afterward.'
    )
    message22 = Message(
        sender_id=2,
        recipient_id=8,
        message='Gathering some learners for a local meet up are you in?'
    )
    message23 = Message(
        sender_id=6,
        recipient_id=8,
        message='How about a trivia contest or a storytelling session?'
    )
    message24 = Message(
        sender_id=5,
        recipient_id=8,
        message='Hi, how are you?'
    )
    message25 = Message(
        sender_id=1,
        recipient_id=9,
        message="Hi, I saw in your bio that you like to cook! Can you share any recipes with me?"
    )
    message26 = Message(
        sender_id=3,
        recipient_id=9,
        message="Hi, I am also a fan of international programs! See any good ones lately?"
    )
    message27 = Message(
        sender_id=4,
        recipient_id=9,
        message='Hi, how are you?'
    )
    message28 = Message(
        sender_id=7,
        recipient_id=1,
        message='What is your favorite part of learning a new language?'
    )
    message29 = Message(
        sender_id=2,
        recipient_id=1,
        message="I’ve only just begun! Signed up to make more friends who want to speak the same language."
    )
    message30 = Message(
        sender_id=5,
        recipient_id=1,
        message="Yup, let arrange a time for a call !"
    )

    db.session.add_all([
        message1, message2, message3, message4, message5, message6,
        message7, message8, message9, message10, message11, message12,
        message13, message14, message15, message16, message17, message18,
        message19, message20, message21, message22, message23, message24,
        message25, message26, message27, message28, message29, message30
    ])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the messages table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()
