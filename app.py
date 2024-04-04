from flask import Flask, session, redirect, url_for, request, render_template, flash
from functions import *
from forms import *
from flask_bootstrap import Bootstrap
from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder='front-end/build')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

host = 'http://127.0.0.1:5000/'


@app.route('/login', methods=['POST', 'GET'])
def login():
    error = None
    if request.method == 'POST':
        account = request.form['account']
        password = request.form['password']
        work_id = request.form['work_id']
        
        if validate_credentials(account, password, work_id):
            session['account'] = account
            session['work_id'] = work_id
            return redirect(url_for('home'))
        else:
            error = 'Invalid account, password, or work ID'
    return render_template('login.html', error=error)

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


