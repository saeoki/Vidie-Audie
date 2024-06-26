from flask import Flask # Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/users')
def users():
	# users 데이터를 Json 형식으로 반환한다
    return {"members": [{ "id" : 1, "name" : "yerin" },
    					{ "id" : 2, "name" : "dalkong" }]}
           

if __name__ == "__main__":
    app.run(debug = True)