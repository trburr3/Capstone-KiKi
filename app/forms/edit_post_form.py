from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError


class EditPostForm(FlaskForm):
    body = StringField('body', validators=[])
    title = StringField('title', validators=[])
    private = BooleanField('private', validators=[])
    level = IntegerField('level', validators=[])