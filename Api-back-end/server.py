from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from dotenv import load_dotenv
import os
import uuid
import ply.lex as lex

load_dotenv()

HOST = os.getenv('HOST')
PORT = int(os.getenv('PORT'))
ORIGINS = os.getenv('ORIGINS')

app = Flask(__name__)
CORS(app, origins=ORIGINS)

tokens = ('PR','ID','PI','PD','LI','LD','PC','VAR','OP','CO','ER')

t_PR = r'\b(programa|int|read|printf|la|es|end)\b'
t_ID = r'\bsuma\b'
t_PI = r'\('
t_PD = r'\)'
t_LI = r'{'
t_LD = r'}'
t_PC = r';'
t_VAR = r'\b(a|b|c)\b'
t_OP = r'\+|-|\*'
t_CO = r','
t_ER = r'\b\w+\b'

t_ignore = ' \t".0'':=/<>_%&|!^~?@#[]'

def t_newline(t):
    r'\n+'
    t.lexer.lineno += len(t.value)

def t_error(t):
    print(f"Illegal character '{t.value[0]}'")
    t.lexer.skip(1)

lexer = lex.lex()

def analyze_content(content):
    lexer.lineno = 1
    lexer.input(content)
    result = []
    for tok in lexer:
        if tok.type == 'PR' and tok.value not in ['programa', 'int', 'read', 'printf', 'la', 'es', 'end']:
            tok.type = 'ER'
        result.append({"id": str(uuid.uuid4()), "linea": tok.lineno, "type": tok.type, "value": tok.value, "token": tok.value})
    return result

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return make_response(jsonify({"error": "No file part"}), 400)
    file = request.files['file']
    if file.filename == '':
        return make_response(jsonify({"error": "No selected file"}), 400)
    if file:
        content = file.read().decode('utf-8')
        result = analyze_content(content)
        if not result:
            return make_response(jsonify({"error": "Not found tokens in the file"}), 404)
        return jsonify(result)
    
@app.route('/analyze', methods=['POST'])
def analyze_code():
    code = request.data.decode('utf-8')
    if not isinstance(code, str):
        return make_response(jsonify({"error": "Invalid input"}), 400)
    result = analyze_content(code)
    if not result:
        return make_response(jsonify({"error": "Not found tokens in the code"}), 404)
    return jsonify(result)

@app.route('/')
def hello_world():
    return 'Hello, World! Api-back-end is running on {}:{}'.format(HOST, PORT)

if __name__ == '__main__':
    app.run(debug=True, host=HOST, port=PORT)