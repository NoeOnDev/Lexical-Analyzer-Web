from flask import Flask
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    host = os.getenv('HOST')
    port = int(os.getenv('PORT'))
    app.run(debug=True, host=host, port=port)