from flask import Flask, request, jsonify
import requests
import mysql.connector
from mysql.connector import errorcode
from flask_cors import CORS
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
KAKAO_API_HOST = "https://kapi.kakao.com"
KAKAO_REST_API_KEY = os.getenv('KAKAO_REST_API_KEY')

# MySQL 설정
MYSQL_DATABASE_USER = os.getenv('MYSQL_DATABASE_USER')
MYSQL_DATABASE_PASSWORD = os.getenv('MYSQL_DATABASE_PASSWORD')
MYSQL_DATABASE_DB = os.getenv('MYSQL_DATABASE_DB')
MYSQL_DATABASE_HOST = os.getenv('MYSQL_DATABASE_HOST')
MYSQL_DATABASE_PORT = os.getenv('MYSQL_DATABASE_PORT')

def get_db_connection():
    try:
        print("Connecting to database...")
        connection = mysql.connector.connect(
            user=MYSQL_DATABASE_USER,
            password=MYSQL_DATABASE_PASSWORD,
            host=MYSQL_DATABASE_HOST,
            database=MYSQL_DATABASE_DB,
            port=MYSQL_DATABASE_PORT
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

@app.route('/kakaoLogin', methods=['POST'])
def kakao_login():
    try:
        print("Received request for /kakaoLogin")
        token = request.json.get('token')
        print(f"Token received: {token}")
        headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
        user_info_response = requests.get(f'{KAKAO_API_HOST}/v2/user/me', headers=headers)
        print("Kakao API response received")

        if user_info_response.status_code != 200:
            print("Failed to fetch user info from Kakao")
            return jsonify({'error': 'Failed to fetch user info from Kakao'}), user_info_response.status_code

        user_info = user_info_response.json()
        print(f"User info: {user_info}")

        user_id = user_info['id']
        nickname = user_info['properties']['nickname']
        connected_at = user_info['connected_at']

        # Convert connected_at to MySQL DATETIME format
        connected_at = datetime.strptime(connected_at, '%Y-%m-%dT%H:%M:%SZ').strftime('%Y-%m-%d %H:%M:%S')

        db_conn = get_db_connection()
        if db_conn is None:
            print('Database connection failed')
            return jsonify({'error': 'Failed to connect to database'}), 500

        cursor = db_conn.cursor()
        try:
            print("Inserting or updating user info in the database")
            cursor.execute("""
                INSERT INTO users (id, nickname, connected_at)
                VALUES (%s, %s, %s)
                ON DUPLICATE KEY UPDATE nickname=%s, connected_at=%s
            """, (user_id, nickname, connected_at, nickname, connected_at))
            db_conn.commit()
            print("Database operation successful")
        except mysql.connector.Error as err:
            print(f"Error executing SQL: {err}")
            return jsonify({'error': str(err)}), 500
        finally:
            cursor.close()
            db_conn.close()

        return jsonify(user_info)
    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/user/<int:user_id>/add_record', methods=['POST'])
def add_record(user_id):
    try:
        data = request.json
        url = data.get('url')
        title = data.get('title')
        if not url or not title:
            return jsonify({'error': 'URL and title are required'}), 400

        db_conn = get_db_connection()
        if db_conn is None:
            print('Database connection failed')
            return jsonify({'error': 'Failed to connect to database'}), 500

        cursor = db_conn.cursor()
        try:
            print(f"Inserting record for user {user_id}: URL={url}, Title={title}")
            cursor.execute("""
                INSERT INTO user_records (user_id, video_url, title)
                VALUES (%s, %s, %s)
            """, (user_id, url, title))
            db_conn.commit()
            print("Record insertion successful")
        except mysql.connector.Error as err:
            print(f"Error executing SQL: {err}")
            return jsonify({'error': str(err)}), 500
        finally:
            cursor.close()
            db_conn.close()

        return jsonify({'status': 'success'}), 201
    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/user/<int:user_id>/records', methods=['GET'])
def get_records(user_id):
    db_conn = get_db_connection()
    if db_conn is None:
        print('Database connection failed')
        return jsonify({'error': 'Failed to connect to database'}), 500

    cursor = db_conn.cursor()
    try:
        cursor.execute("""
            SELECT id, video_url, title, created_at FROM user_records WHERE user_id = %s
        """, (user_id,))
        records = cursor.fetchall()
    except mysql.connector.Error as err:
        print(f"Error executing SQL: {err}")
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db_conn.close()

    return jsonify(records)


@app.route('/video_title/<video_id>', methods=['GET'])
def get_video_title(video_id):
    print(f"Received request for video title with ID: {video_id}")
    db_conn = get_db_connection()
    if db_conn is None:
        print("Database connection failed")
        return jsonify({'error': 'Failed to connect to database'}), 500

    cursor = db_conn.cursor()
    title = "Title not found"
    try:
        cursor.execute("""
            SELECT title FROM user_records WHERE video_url = %s
        """, (video_id,))
        result = cursor.fetchone()
        print(f"Query result: {result}")
        if result:
            title = result[0]
        # Read all results to avoid "Unread result found" error
        cursor.fetchall()
    except mysql.connector.Error as err:
        print(f"Error executing SQL: {err}")
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db_conn.close()

    return jsonify({'title': title})




if __name__ == '__main__':
    app.run(debug=True, port=5000)
