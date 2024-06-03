from flask import Flask, request, jsonify
import requests
import mysql.connector
from mysql.connector import errorcode
from flask_cors import CORS
import os
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
KAKAO_API_HOST = "https://kapi.kakao.com"
KAKAO_REST_API_KEY = "8869b2e721fae7a4bc8d282f48dfef0c"

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
        cursor.execute("""
            INSERT INTO user_records (user_id, url, title)
            VALUES (%s, %s, %s)
        """, (user_id, url, title))
        db_conn.commit()
    except mysql.connector.Error as err:
        print(f"Error executing SQL: {err}")
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db_conn.close()

    return jsonify({'status': 'success'}), 201

@app.route('/user/<int:user_id>/records', methods=['GET'])
def get_records(user_id):
    db_conn = get_db_connection()
    if db_conn is None:
        print('Database connection failed')
        return jsonify({'error': 'Failed to connect to database'}), 500

    cursor = db_conn.cursor()
    try:
        cursor.execute("""
            SELECT id, url, title, created_at FROM user_records WHERE user_id = %s
        """, (user_id,))
        records = cursor.fetchall()
    except mysql.connector.Error as err:
        print(f"Error executing SQL: {err}")
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db_conn.close()

    return jsonify(records)

if __name__ == '__main__':
    app.run(debug=True, port=5000)