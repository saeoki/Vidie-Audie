from flask import Flask, request, jsonify
import requests 
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

KAKAO_API_HOST = "https://kapi.kakao.com"
KAKAO_REST_API_KEY = "8869b2e721fae7a4bc8d282f48dfef0c"

@app.route('/kakaoLogin', methods=['POST'])
def kakao_login():
    token = request.json.get('token')
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
    user_info_response = requests.get(f'{KAKAO_API_HOST}/v2/user/me', headers=headers)
    
    if user_info_response.status_code != 200:
        return jsonify({'error': 'Failed to fetch user info from Kakao'}), user_info_response.status_code
    
    user_info = user_info_response.json()
    print(f'User info: {user_info}')
    return jsonify(user_info)

if __name__ == '__main__':
    app.run(debug=True)
