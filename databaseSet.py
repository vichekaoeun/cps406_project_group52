import sqlite3
from flask import g, current_app

DATABASE = 'database.db'

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(DATABASE)
        g.db.row_factory = sqlite3.Row
        
        with g.db:
            g.db.execute("PRAGMA journal_mode=WAL;")
            g.db.execute("PRAGMA busy_timeout = 5000;")

    return g.db

def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_db():
    with current_app.app_context():
        db = get_db()
        with current_app.open_resource('dbinit.sql', mode='r') as f:
            db.executescript(f.read())