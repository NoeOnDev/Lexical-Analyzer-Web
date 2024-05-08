from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import ply.lex as lex

load_dotenv()

HOST = os.getenv('HOST')
PORT = int(os.getenv('PORT'))
ORIGINS = os.getenv('ORIGINS')

app = Flask(__name__)
CORS(app, origins=ORIGINS)

tokens = (
    'FOR',
    'IF',
    'DO',
    'WHILE',
    'ELSE',
    'LPAREN',
    'RPAREN',
)

t_FOR = r'\bfor\b'
t_IF = r'\bif\b'
t_DO = r'\bdo\b'
t_WHILE = r'\bwhile\b'
t_ELSE = r'\belse\b'
t_LPAREN = r'\('
t_RPAREN = r'\)'

t_ignore = ' \t,;.{}"0'':=+-*/<>_%&|!^~?@#[]'

def t_newline(t):
    r'\n+'
    t.lexer.lineno += len(t.value)

def t_error(t):
    print(f"Illegal character '{t.value[0]}'")
    t.lexer.skip(1)

lexer = lex.lex()

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    if file.filename == '':
        return 'No selected file'
    if file:
        content = file.read().decode('utf-8')
        lexer.lineno = 1
        lexer.input(content)
        result = []
        for tok in lexer:
            result.append({"linea": tok.lineno, "reserved": tok.type, "symbol": tok.value})
        return jsonify(result)
    
@app.route('/analyze', methods=['POST'])
def analyze_code():
    code = request.data.decode('utf-8')
    lexer.lineno = 1
    lexer.input(code)
    result = []
    for tok in lexer:
        result.append({"linea": tok.lineno, "reserved": tok.type, "symbol": tok.value})
    return jsonify(result)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True, host=HOST, port=PORT)
