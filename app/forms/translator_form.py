from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


class TranslatorForm(FlaskForm):
    text = StringField('text', validators=[DataRequired()])
    language = StringField('language', validators=[DataRequired()])