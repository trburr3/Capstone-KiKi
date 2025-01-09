from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo message, you can add other messages here if you want
def seed_messages():
    message1 = Message(
        sender_id=1,
        recipient_id=1,
        message='Does anyone want to carpool to the beach cleanup this weekend?'
    )
    message2 = Message(
        sender_id=2,
        recipient_id=1,
        message="I’ll bring some extra gloves and trash bags for the cleanup!"
    )
    message3 = Message(
        sender_id=3,
        recipient_id=1,
        message="Let’s meet at the entrance by 8:00 AM to get started!"
    )
    message4 = Message(
        sender_id=4,
        recipient_id=2,
        message="The toy drive is coming up soon! Who’s bringing toys?"
    )
    message5 = Message(
        sender_id=5,
        recipient_id=2,
        message='I can contribute board games and stuffed animals.'
    )
    message6 = Message(
        sender_id=6,
        recipient_id=2,
        message="Let’s sort the toys into age-appropriate groups on the event day."
    )
    message7 = Message(
        sender_id=1,
        recipient_id=3,
        message='Is everyone ready to help at the soup kitchen this week?'
    )
    message8 = Message(
        sender_id=3,
        recipient_id=3,
        message="I’ll take care of the serving line. Let’s coordinate tasks."
    )
    message9 = Message(
        sender_id=6,
        recipient_id=3,
        message='I can help prepare meals in the morning shift.'
    )
    message10 = Message(
        sender_id=2,
        recipient_id=4,
        message="The puppy car wash is set for Saturday! Don’t forget your towels!"
    )
    message11 = Message(
        sender_id=5,
        recipient_id=4,
        message='I’ll bring dog shampoo and some treats for the pups!'
    )
    message12 = Message(
        sender_id=4,
        recipient_id=4,
        message='Let’s set up a photo booth to help promote adoptions.'
    )
    message13 = Message(
        sender_id=3,
        recipient_id=5,
        message='Are we all set for the Helping Hands event next week?'
    )
    message14 = Message(
        sender_id=1,
        recipient_id=5,
        message='I’ve arranged for some supplies. Let me know what else we need.'
    )
    message15 = Message(
        sender_id=6,
        recipient_id=5,
        message="I can assist with heavy lifting and setting up equipment."
    )
    message16 = Message(
        sender_id=4,
        recipient_id=6,
        message="The Kids Theatre program is next month. Who’s helping with rehearsals?"
    )
    message17 = Message(
        sender_id=2,
        recipient_id=6,
        message="I can assist with costume design and stage setup."
    )
    message18 = Message(
        sender_id=5,
        recipient_id=6,
        message='I’ll help the kids practice their lines and gestures.'
    )
    message19 = Message(
        sender_id=1,
        recipient_id=7,
        message="The garden cleanup is this weekend. Don’t forget sunscreen!"
    )
    message20 = Message(
        sender_id=4,
        recipient_id=7,
        message="I’ll bring refreshments and snacks for everyone!"
    )
    message21 = Message(
        sender_id=3,
        recipient_id=7,
        message='I’ll handle coordinating the trash disposal afterward.'
    )
    message22 = Message(
        sender_id=2,
        recipient_id=8,
        message='We’re planning activities for the senior center. Ideas?'
    )
    message23 = Message(
        sender_id=6,
        recipient_id=8,
        message='How about a trivia contest or a storytelling session?'
    )
    message24 = Message(
        sender_id=5,
        recipient_id=8,
        message='Great idea! I can bring some materials for the trivia game.'
    )
    message25 = Message(
        sender_id=1,
        recipient_id=9,
        message="We’re assembling hygiene kits this Friday. Anyone bringing supplies?"
    )
    message26 = Message(
        sender_id=3,
        recipient_id=9,
        message="I’ll bring toothbrushes, toothpaste, and deodorants."
    )
    message27 = Message(
        sender_id=4,
        recipient_id=9,
        message='I’ll pack everything into the kits on the event day.'
    )
    message28 = Message(
        sender_id=6,
        recipient_id=10,
        message='The blood donation drive needs more volunteers. Who’s available?'
    )
    message29 = Message(
        sender_id=2,
        recipient_id=10,
        message="I’ll be there. Let’s coordinate the registration process."
    )
    message30 = Message(
        sender_id=5,
        recipient_id=10,
        message="Don’t forget to eat a light meal before donating!"
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
