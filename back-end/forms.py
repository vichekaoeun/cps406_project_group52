from __future__ import unicode_literals
from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField, TextAreaField

class Post_Form(FlaskForm):
    post_info = TextAreaField('Post Content')
    submit = SubmitField('Submit')