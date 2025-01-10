from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class EditProfileForm(FlaskForm):
    username = StringField(
        'username', validators=[username_exists])
    email = StringField('email', validators=[Email(), user_exists])
    fist_name = StringField('first_name', validators=[])
    last_name = StringField('last_name', validators=[])
    native = StringField('native', validators=[])
    learning = StringField('learning', validators=[])
    level = IntegerField('level', validators=[])
    bio = StringField('bio', validators=[])
    city = StringField('city', validators=[])
    state = StringField('state', validators=[])
    prof_pic = StringField('prof_pic', validators=[])
    pref_theme = StringField('pref_theme', validators=[])
    pref_chatroom = StringField('pref_chatroom', validators=[])