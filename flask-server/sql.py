import mysql.connector
from mysql.connector import errorcode

# MySQL 설정
MYSQL_DATABASE_USER = 'root'
MYSQL_DATABASE_PASSWORD = '12qwaszx'
MYSQL_DATABASE_DB = 'user_db'
MYSQL_DATABASE_HOST = 'localhost'

def get_db_connection():
    try:
        print("Connecting to database...")
        connection = mysql.connector.connect(
            user=MYSQL_DATABASE_USER,
            password=MYSQL_DATABASE_PASSWORD,
            host=MYSQL_DATABASE_HOST,
            database=MYSQL_DATABASE_DB
        )
        print("Database connection successful")
        return connection
    except mysql.connector.Error as err:
        print("Database connection error:", err)
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
        return None

def create_table():
    db_conn = get_db_connection()
    if db_conn is None:
        return

    cursor = db_conn.cursor()
    try:
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS test_table (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        print("Table created successfully")
    except mysql.connector.Error as err:
        print(f"Error creating table: {err}")
    finally:
        cursor.close()
        db_conn.close()

def insert_data():
    db_conn = get_db_connection()
    if db_conn is None:
        return

    cursor = db_conn.cursor()
    try:
        cursor.execute("INSERT INTO test_table (name) VALUES ('Test Name')")
        db_conn.commit()
        print("Data inserted successfully")
    except mysql.connector.Error as err:
        print(f"Error inserting data: {err}")
    finally:
        cursor.close()
        db_conn.close()

def fetch_data():
    db_conn = get_db_connection()
    if db_conn is None:
        return

    cursor = db_conn.cursor()
    try:
        cursor.execute("SELECT * FROM test_table")
        rows = cursor.fetchall()
        print("Data fetched successfully")
        for row in rows:
            print(row)
    except mysql.connector.Error as err:
        print(f"Error fetching data: {err}")
    finally:
        cursor.close()
        db_conn.close()

if __name__ == '__main__':
    create_table()
    insert_data()
    fetch_data()