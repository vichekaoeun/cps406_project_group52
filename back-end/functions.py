import sqlite3 as sql

def validate_credentials(username, password):
    connection = sql.connect('database.db')
    sql_statement = "SELECT * FROM Users where username = '{}' and password ='{}';".format (username, password)
    cursor = connection. execute(sql_statement)
    return cursor.fetchall()

def update_pw (pw,id):
    connection = sql.connect('database.db')
    sql_statement = "UPDATE Users SET password = '{}' where id = {};".format(pw,id)
    connection.execute(sql_statement)
    connection.commit()

def query_post(post_info):
    connection = sql.connect('database.db')
    sql_statement = "SELECT * FROM Posts where post_info = '{}';".format(post_info)
    cursor = connection.execute(sql_statement)
    return cursor.fetchall()

def add_post(username,post_id):
    connection = sql.connect('database.db')
    sql_statement = 'INSERT INTO Posts(username,post_id) VALUES (?,?);'

    connection.execute(
        sql_statement,(username,post_id,)
    )
    connection.commit()

def add_comment(username,comment_info,post_id):
    connection = sql.connect('database.db')
    sql_statement = 'INSERT INTO Comments(username,comment_info,course_id,post_no) VALUES (?,?,?,?);'

    connection.execute(
        sql_statement,(username,comment_info,post_id)
    )
    connection.commit()

def query_comments(post_id):
    connection = sql.connect('database.db')
    sql_statement = "SELECT username,comment_info FROM Comments where post_id = {};".format(post_id)
    print(sql_statement)
    cursor = connection.execute(sql_statement)
    return cursor.fetchall()