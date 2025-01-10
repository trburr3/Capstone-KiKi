from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        first_name = 'Chuck',
        last_name = 'E. Cheese',
        native = 'English',
        learning = 'Spanish',
        level = 3,
        bio = 'This is a sample bio',
        city = 'Miami',
        state = 'Florida',
        prof_pic = 'default.png',
        )
    esther = User(
        username='pinkie00',
        email='pink@aa.io',
        password='password',
        first_name = 'Esther',
        last_name = 'L.',
        native = 'English',
        learning = 'French',
        level = 1,
        bio = 'This is a sample bio',
        city = 'Miami',
        state = 'Florida',
        prof_pic = 'default.png'
        )
    aixa = User(
        username='guillotine',
        email='aixa@aa.io',
        password='password',
        first_name = 'Aixa',
        last_name = 'G.',
        native = 'Spanish',
        learning = 'English',
        level = 2,
        bio = 'This is a sample bio',
        city = 'Miami',
        state = 'Florida',
        prof_pic = 'default.png'
        )
    lia = User(
        username='mufasa',
        email='lia@aa.io',
        password='password',
        first_name = 'Lia',
        last_name = 'C.',
        native = 'Spanish',
        learning = 'English',
        level = 1,
        bio = 'This is a sample bio',
        city = 'Miami',
        state = 'Florida',
        prof_pic = 'default.png'
        )
    amar = User(
        username='butchkid',
        email='butch@aa.io',
        password='password',
        first_name = 'Amar',
        last_name = 'J.',
        native = 'English',
        learning = 'Spanish',
        level = 1,
        bio = 'This is a sample bio',
        city = 'Miami',
        state = 'Florida',
        prof_pic = 'default.png'
        )
    spring = User(
        username='spring',
        email='spring@aa.io',
        password='password',
        first_name = 'Spring',
        last_name = 'L.',
        native = 'Spanish',
        learning = 'English',
        level = 2,
        bio = 'This is a sample bio',
        city = 'Miami',
        state = 'Florida',
        prof_pic = 'default.png'
        )
    isa = User(
        username='miniIsa',
        email='isa@aa.io',
        password='password',
        first_name = 'Isa',
        last_name = 'L.',
        native = 'Spanish',
        learning = 'English',
        level = 3,
        bio = 'This is a sample bio',
        city = 'Miami',
        state = 'Florida',
        prof_pic = 'default.png'
        )
    chanelle = User(
        username='chanchan',
        email='chan@aa.io',
        password='password',
        first_name = 'Chanelle',
        last_name = 'F.',
        native = 'English',
        learning = 'French',
        level = 1,
        bio = 'This is a sample bio',
        city = 'Chicago',
        state = 'Illinois',
        prof_pic = 'default.png'
        )
    ashley = User(
        username='ashusername',
        email='ash@aa.io',
        password='password',
        first_name = 'Ashley',
        last_name = 'M.',
        native = 'Spanish',
        learning = 'English',
        level = 2,
        bio = 'This is a sample bio',
        city = 'New York',
        state = 'New York',
        prof_pic = 'default.png'
        )
    djeneba = User(
        username='dejeneba_real',
        email='djeneba@aa.io',
        password='password',
        first_name = 'Djeneba',
        last_name = 'F.',
        native = 'French',
        learning = 'English',
        level = 2,
        bio = 'This is a sample bio',
        city = 'New York',
        state = 'New York',
        prof_pic = 'default.png'
        )
    maya = User(
        username='mimi',
        email='mimi@aa.io',
        password='password',
        first_name = 'Maya',
        last_name = 'B.',
        native = 'English',
        learning = 'French',
        level = 1,
        bio = 'This is a sample bio',
        city = 'Miami',
        state = 'Florida',
        prof_pic = 'default.png'
        )
    zell = User(
        username='raisezell',
        email='zell@aa.io',
        password='password',
        first_name = 'Zell',
        last_name = 'H.',
        native = 'English',
        learning = 'Italian',
        level = 2,
        bio = 'This is a sample bio',
        city = 'San Francisco',
        state = 'California',
        prof_pic = 'default.png'
        )
    asajahnique = User(
        username='asa',
        email='asa@aa.io',
        password='password',
        first_name = 'Asajahnique',
        last_name = 'J.',
        native = 'Spanish',
        learning = 'English',
        level = 2,
        bio = 'This is a sample bio',
        city = 'New York',
        state = 'New York',
        pref_theme = 'dark',
        pref_chatroom = 'pink',
        prof_pic = 'default.png'
        )
    regina = User(
        username='gina',
        email='gina@aa.io',
        password='password',
        first_name = 'Regina',
        last_name = 'F.',
        native = 'English',
        learning = 'Spanish',
        level = 2,
        bio = 'This is a sample bio',
        city = 'New York',
        state = 'New York',
        pref_theme = 'dark',
        pref_chatroom = 'pink',
        prof_pic = 'default.png'
        )
    alyssa = User(
        username='pretty_alyssa',
        email='alyssa@aa.io',
        password='password',
        first_name = 'Alyssa',
        last_name = 'E.',
        native = 'English',
        learning = 'French',
        level = 2,
        bio = 'This is a sample bio',
        city = 'San Francisco',
        state = 'California',
        prof_pic = 'default.png'
        )
    karter = User(
        username='kingkarter',
        email='karter@aa.io',
        password='password',
        first_name = 'Karter',
        last_name = 'H.',
        native = 'French',
        learning = 'English',
        level = 2,
        bio = 'This is a sample bio',
        city = 'San Francisco',
        state = 'California',
        prof_pic = 'default.png'
        )
    rachelly = User(
        username='chelly',
        email='chelly@aa.io',
        password='password',
        first_name = 'Rachelly',
        last_name = 'B.',
        native = 'Italian',
        learning = 'English',
        level = 2,
        bio = 'This is a sample bio',
        city = 'Miami',
        state = 'Florida',
        prof_pic = 'default.png'
        )
    car = User(
        username='thee_car',
        email='car@aa.io',
        password='password',
        first_name = 'Car',
        last_name = 'O.',
        native = 'English',
        learning = 'Italian',
        level = 2,
        bio = 'This is a sample bio',
        city = 'Chicago',
        state = 'Illinois',
        prof_pic = 'default.png'
        )
    ishmael = User(
        username='ishy',
        email='ish@aa.io',
        password='password',
        first_name = 'Ishmael',
        last_name = 'R.',
        native = 'English',
        learning = 'Italian',
        level = 1,
        bio = 'This is a sample bio',
        city = 'Miami',
        state = 'Florida',
        prof_pic = 'default.png'
        )
    kaylee = User(
        username='kale',
        email='kale@aa.io',
        password='password',
        first_name = 'Kaylee',
        last_name = 'F.',
        native = 'English',
        learning = 'Italian',
        level = 3,
        bio = 'This is a sample bio',
        city = 'Miami',
        state = 'Florida',
        prof_pic = 'default.png'
        )
    britt = User(
        username='brittluvpie',
        email='britt@aa.io',
        password='password',
        first_name = 'Britt',
        last_name = 'D.',
        native = 'Italian',
        learning = 'English',
        level = 1,
        bio = 'This is a sample bio',
        city = 'Miami',
        state = 'Florida',
        prof_pic = 'default.png'
        )
    marqui = User(
        username='moneymark',
        email='mark@aa.io',
        password='password',
        first_name = 'Marqui',
        last_name = 'P.',
        native = 'English',
        learning = 'Portuguese',
        level = 1,
        bio = 'This is a sample bio',
        city = 'Miami',
        state = 'Florida',
        prof_pic = 'default.png'
        )
    jaida = User(
        username='jaida_kiss',
        email='jaida@aa.io',
        password='password',
        first_name = 'Jaida',
        last_name = 'D.',
        native = 'English',
        learning = 'Portuguese',
        level = 2,
        bio = 'This is a sample bio',
        city = 'Miami',
        state = 'Florida',
        prof_pic = 'default.png'
        )
    torrien = User(
        username='torrie_otaku',
        email='torrie@aa.io',
        password='password',
        first_name = 'Torrien',
        last_name = 'L.',
        native = 'English',
        learning = 'Japanese',
        level = 1,
        bio = 'This is a sample bio',
        city = 'Miami',
        state = 'Florida',
        prof_pic = 'default.png'
        )
    taylore = User(
        username='taye',
        email='taye@aa.io',
        password='password',
        first_name = 'Taylore',
        last_name = 'B.',
        native = 'English',
        learning = 'Japanese',
        level = 1,
        bio = 'This is a sample bio',
        city = 'Miami',
        state = 'Florida',
        prof_pic = 'default.png'
        )
    gale = User(
        username='galeStorm',
        email='gale@aa.io',
        password='password',
        first_name = 'Gale',
        last_name = 'W.',
        native = 'Japanese',
        learning = 'English',
        level = 3,
        bio = 'This is a sample bio',
        city = 'Miami',
        state = 'Florida',
        prof_pic = 'default.png'
        )
    latoyia = User(
        username='ms_hollywood',
        email='toyia@aa.io',
        password='password',
        first_name = 'Latoyia',
        last_name = 'P.',
        native = 'Portugese',
        learning = 'English',
        level = 3,
        bio = 'This is a sample bio',
        city = 'Miami',
        state = 'Florida',
        prof_pic = 'default.png'
        )
    alayna = User(
        username='nana',
        email='alayna@aa.io',
        password='password',
        first_name = 'Alayna',
        last_name = 'R.',
        native = 'Spanish',
        learning = 'Japanese',
        level = 2,
        bio = 'This is a sample bio',
        city = 'Miami',
        state = 'Florida',
        prof_pic = 'default.png'
        )
    helena = User(
        username='helena32',
        email='helena@aa.io',
        password='password',
        first_name = 'Helena',
        last_name = 'A.',
        native = 'Spanish',
        learning = 'Portuguese',
        level = 1,
        bio = 'This is a sample bio',
        city = 'Miami',
        state = 'Florida',
        prof_pic = 'default.png'
        )
    emma = User(
        username='emma_down',
        email='emma@aa.io',
        password='password',
        first_name = 'Emma',
        last_name = 'O.',
        native = 'English',
        learning = 'Japanese',
        level = 2,
        bio = 'This is a sample bio',
        city = 'Chicago',
        state = 'Illinois',
        prof_pic = 'default.png'
        )
    jhonny = User(
        username='jhon_cena',
        email='jhon@aa.io',
        password='password',
        first_name = 'Jhonny',
        last_name = 'L.',
        native = 'English',
        learning = 'Japanese',
        level = 3,
        bio = 'This is a sample bio',
        city = 'Chicago',
        state = 'Illinois',
        prof_pic = 'default.png'
        )

    db.session.add(demo)
    db.session.add(esther)
    db.session.add(aixa)
    db.session.add(amar)
    db.session.add(lia)
    db.session.add(zell)
    db.session.add(maya)
    db.session.add(rachelly)
    db.session.add(djeneba)
    db.session.add(chanelle)
    db.session.add(ashley)
    db.session.add(asajahnique)
    db.session.add(regina)
    db.session.add(alyssa)
    db.session.add(karter)
    db.session.add(britt)
    db.session.add(kaylee)
    db.session.add(spring)
    db.session.add(isa)
    db.session.add(ishmael)
    db.session.add(car)
    db.session.add(marqui)
    db.session.add(jaida)
    db.session.add(torrien)
    db.session.add(taylore)
    db.session.add(jhonny)
    db.session.add(alayna)
    db.session.add(helena)
    db.session.add(emma)
    db.session.add(gale)
    db.session.add(latoyia)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
