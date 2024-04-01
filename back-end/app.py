from flask import Flask, session, redirect, url_for, request, render_template, flash
from functions import *
from forms import *
from flask_bootstrap import Bootstrap

app = Flask(__name__)
app.secret_key = 'saddsffds'
bootstrap = Bootstrap(app)

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
            student_email = session["email"],
            post_no = post_no,
            post_id = post[2]
        )

    comments = query_comments(post_no=post_no)
    print(comments)
    return render_template('post.html', post_title=post_title,student_email=session["email"],comments=comments)


if __name__ == "__main__":
    app.run(debug=True)


