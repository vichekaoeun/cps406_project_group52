from flask import Flask, jsonify, send_from_directory, session, redirect, url_for, request, render_template, flash
from flask_cors import CORS
from databaseSet import get_db, close_db, init_db
from flask_bootstrap import Bootstrap
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
import sqlite3 
import click
import os

app = Flask(__name__, static_folder='./build')
CORS(app, resources={r"/*": {"origins": "*"}})

@app.cli.command("init-db")
def init_db_command():
    init_db()
    click.echo("Initialized the database.")

@app.teardown_appcontext
def teardown_db(exception):
    close_db(exception)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    employee_id = data['employee_id']
    username = data['username']
    password = data['password']
    password_hash = generate_password_hash(password)

    db = get_db()
    cursor = db.cursor()

    cursor.execute("SELECT 1 FROM user WHERE employee_id = ?", (employee_id,))
    if cursor.fetchone():
        return jsonify({'success': False, 'message': 'Employee ID already registered'}), 409
    
    cursor.execute("SELECT 1 FROM user WHERE username = ?", (username,))
    if cursor.fetchone():
        return jsonify({'success': False, 'message': 'Username already exists'}), 409

    try:
        cursor.execute("INSERT INTO user (employee_id, username, password) VALUES (?, ?, ?)", 
                       (employee_id, username, password_hash))
        db.commit()
        return jsonify({'success': True, 'message': 'Success!'}), 200
    except sqlite3.IntegrityError:
        db.rollback()
        return jsonify({'success': False, 'message': 'Registration failed due to a database error.'}), 500
    except Exception as e:
        db.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500
    
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']

    db = get_db()
    cursor = db.cursor()

    try:
        cursor.execute("SELECT password FROM user WHERE username = ?", (username,))
        user = cursor.fetchone()
        
        if user is None:
            return jsonify({'success': False, 'message': 'Invalid username or password'}), 401

        stored_password_hash = user[0]
        
        if check_password_hash(stored_password_hash, password):
            return jsonify({'success': True, 'message': 'Login successful!'}), 200
        else:
            return jsonify({'success': False, 'message': 'Invalid username or password'}), 401
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/reset_pw', methods=['POST'])
def update_password():
    data = request.json
    employee_id = data['employeeid']
    new_password = data['newPassword']
    confirm_password = data['confirmNewPassword']

    if new_password != confirm_password:
        return jsonify({'success': False, 'message': 'Passwords do not match'}), 400

    db = get_db()
    cursor = db.cursor()

    cursor.execute("SELECT 1 FROM user WHERE employee_id = ?", (employee_id,))
    if not cursor.fetchone():
        return jsonify({'success': False, 'message': 'Employee ID not found'}), 404

    try:
        password_hash = generate_password_hash(new_password)
        cursor.execute("UPDATE user SET password = ? WHERE employee_id = ?", 
                       (password_hash, employee_id))
        db.commit()
        return jsonify({'success': True, 'message': 'Password updated successfully'}), 200
    except Exception as e:
        db.rollback()
        return jsonify({'success': False, 'message': 'Failed to update password'}), 500

@app.route('/reset_un', methods=['POST'])
def update_username():
    data = request.json
    employee_id = data['employeeid']
    new_username = data['newUsername']

    db = get_db()
    cursor = db.cursor()

    cursor.execute("SELECT 1 FROM user WHERE employee_id = ?", (employee_id,))
    if not cursor.fetchone():
        return jsonify({'success': False, 'message': 'Employee ID not found'}), 404

    cursor.execute("SELECT 1 FROM user WHERE username = ?", (new_username,))
    if cursor.fetchone():
        return jsonify({'success': False, 'message': 'Username already exists'}), 409

    try:
        cursor.execute("UPDATE user SET username = ? WHERE employee_id = ?", 
                       (new_username, employee_id))
        db.commit()
        return jsonify({'success': True, 'message': 'Username updated successfully'}), 200
    except Exception as e:
        db.rollback()
        return jsonify({'success': False, 'message': 'Failed to update username'}), 500

@app.route('/report', methods=['POST'])
def submit_report():
    data = request.json
    report_number = data['reportNumber']
    bug_type = data['bugType']
    summary = data['summary']
    updates_requested = data['updatesRequested']
    progress_requested = data['progressRequested']

    db = get_db()
    cursor = db.cursor()

    try:
        cursor.execute("""
            INSERT INTO bug_reports (report_number, bug_type, summary, updates_requested, progress_requested)
            VALUES (?, ?, ?, ?, ?)
        """, (report_number, bug_type, summary, updates_requested, progress_requested))
        db.commit()
        return jsonify({'success': True, 'message': 'Bug report submitted successfully'}), 200
    except sqlite3.IntegrityError:
        db.rollback()
        return jsonify({'success': False, 'message': 'Registration failed due to a database error.'}), 500
    except Exception as e:
        db.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)


