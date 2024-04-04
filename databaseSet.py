def dbinit():
    import sqlite3 as sql
    connection = sql.connect('database.db')
    sql_file = 'dbinit.sql'

    with open(sql_file, encoding='utf-8', mode='r') as f:
        sql_list = f.read().split(';')[:-1]
        for x in sql_list:
            if '\n' in x:
                x = x.replace('\n', ' ')
            sql_item = x + ';'
            connection.execute(sql_item)

if __name__ == "__main__":
    dbinit()
