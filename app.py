from flask import Flask, jsonify, send_from_directory, session, redirect, url_for, request, render_template, flash
from functions import *
from databaseSet import get_db, close_db, init_db
from forms import *
from flask_bootstrap import Bootstrap
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
import sqlite3 
import click
import os

app = Flask(__name__, static_folder='./build')

@app.cli.command("init-db")
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo("Initialized the database.")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

host = 'http://127.0.0.1:5000/'

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    employee_id = data['employee_id']
    username = data['username']
    password = data['password']
    password_hash = generate_password_hash(password)

    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("INSERT INTO user (employee_id, username, password) VALUES (?, ?, ?)", (employee_id, username, password_hash))
        db.commit()
        return jsonify({'success': True, 'message': 'Success!'}), 200
    except sqlite3.IntegrityError:
        return jsonify({'success': False, 'message': 'Username already exists'}), 409
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']

    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT id, password FROM user WHERE username = ?", (username,))
    user = cursor.fetchone()

    if user and check_password_hash(user[1], password):
        return jsonify({'success': True, 'message': 'Logged in successfully'})
    else:
        return jsonify({'success': False, 'message': 'Invalid username or password'}), 401

@app.route('/reset_pw', methods=['POST'])
def reset_pw():
    if request.method == 'POST':
        if request.form['Old_PW']==session['password']:
            update_pw(session['id'],request.form['New_PW'])
            return redirect('/Users')
        else:
            error = 'Old password error'
            return redirect('/Users')

@app.route('/Bugtextbox/<string:post_id>', methods=['GET', 'POST'])
def forum(post_id):

    session['post_id'] = post_id

    post_form = Post_Form()
    if request.method == 'GET':
        posts = query_post(post_id)
        return render_template('BRS.html',posts=posts,post_id=post_id,post_form=post_form,identity=session['user-type'])

    if request.method == 'POST':
        add_post(
            post_info = post_form.post_info.data,
            student_email = session["email"],
            post_id = post_id
        )

        posts = query_post(post_id)
        return render_template('BRS.html', posts=posts, post_id=post_id, post_form=post_form,identity=session['user-type'])


@app.route('/post/<int:post_no>', methods=['GET', 'POST'])
def post(post_no):
    post = query_post(post_no=post_no)[0]
    post_title = post[-1]
    if request.method == 'POST':
        add_comment(
            comment_info = request.form.get("comment_info", type=str),
            account = session["email"],
            post_no = post_no,
            post_id = post[2]
        )

    comments = query_comments(post_no=post_no)
    print(comments)
    return render_template('post.html', post_title=post_title,account=session["email"],comments=comments)


if __name__ == "__main__":
    app.run(debug=True)


