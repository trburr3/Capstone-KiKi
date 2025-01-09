from app.models import db, Request, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo request, you can add other requests here if you want
def seed_requests():
    request1 = Request(
        sender_id=1,
        recipient_id=2
    )
    request2 = Request(
        sender_id=3,
        recipient_id=1,
    )
    request3 = Request(
        sender_id=4,
        recipient_id=1,
    )
    request4 = Request(
        sender_id=5,
        recipient_id=2,
    )
    request5 = Request(
        sender_id=6,
        recipient_id=1,
    )
    request6 = Request(
        sender_id=6,
        recipient_id=2,
    )
    request7 = Request(
        sender_id=8,
        recipient_id=3,
    )
    request8 = Request(
        sender_id=10,
        recipient_id=3,
    )
    request9 = Request(
        sender_id=16,
        recipient_id=3,
    )
    request10 = Request(
        sender_id=20,
        recipient_id=4,
    )
    request11 = Request(
        sender_id=5,
        recipient_id=4,
    )
    request12 = Request(
        sender_id=4,
        recipient_id=10,
    )
    request13 = Request(
        sender_id=3,
        recipient_id=5,
    )
    request14 = Request(
        sender_id=10,
        recipient_id=15,
    )
    request15 = Request(
        sender_id=16,
        recipient_id=7
    )
    # request16 = Request(
    #     sender_id=4,
    #     recipient_id=6,
    #     request="The Kids Theatre program is next month. Who’s helping with rehearsals?"
    # )
    # request17 = Request(
    #     sender_id=2,
    #     recipient_id=6,
    #     request="I can assist with costume design and stage setup."
    # )
    # request18 = Request(
    #     sender_id=5,
    #     recipient_id=6,
    #     request='I’ll help the kids practice their lines and gestures.'
    # )
    # request19 = Request(
    #     sender_id=1,
    #     recipient_id=7,
    #     request="The garden cleanup is this weekend. Don’t forget sunscreen!"
    # )
    # request20 = Request(
    #     sender_id=4,
    #     recipient_id=7,
    #     request="I’ll bring refreshments and snacks for everyone!"
    # )
    # request21 = Request(
    #     sender_id=3,
    #     recipient_id=7,
    #     request='I’ll handle coordinating the trash disposal afterward.'
    # )
    # request22 = Request(
    #     sender_id=2,
    #     recipient_id=8,
    #     request='We’re planning activities for the senior center. Ideas?'
    # )
    # request23 = Request(
    #     sender_id=6,
    #     recipient_id=8,
    #     request='How about a trivia contest or a storytelling session?'
    # )
    # request24 = Request(
    #     sender_id=5,
    #     recipient_id=8,
    #     request='Great idea! I can bring some materials for the trivia game.'
    # )
    # request25 = Request(
    #     sender_id=1,
    #     recipient_id=9,
    #     request="We’re assembling hygiene kits this Friday. Anyone bringing supplies?"
    # )
    # request26 = Request(
    #     sender_id=3,
    #     recipient_id=9,
    #     request="I’ll bring toothbrushes, toothpaste, and deodorants."
    # )
    # request27 = Request(
    #     sender_id=4,
    #     recipient_id=9,
    #     request='I’ll pack everything into the kits on the event day.'
    # )
    # request28 = Request(
    #     sender_id=6,
    #     recipient_id=10,
    #     request='The blood donation drive needs more volunteers. Who’s available?'
    # )
    # request29 = Request(
    #     sender_id=2,
    #     recipient_id=10,
    #     request="I’ll be there. Let’s coordinate the registration process."
    # )
    # request30 = Request(
    #     sender_id=5,
    #     recipient_id=10,
    #     message="Don’t forget to eat a light meal before donating!"
    # )

    #  request16, request17, request18,
    #     request19, request20, request21, request22, request23, request24,
    #     request25, request26, request27, request28, request29, request30

    db.session.add_all([
        request1, request2, request3, request4, request5, request6,
        request7, request8, request9, request10, request11, request12,
        request13, request14, request15
    ])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the requests table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_requests():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.requests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM requests"))

    db.session.commit()