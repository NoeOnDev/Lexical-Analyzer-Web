from flask import Flask, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import ply.lex as lex

load_dotenv()

app = Flask(__name__)
CORS(app, origins=os.getenv('ORIGINS'))

tokens = (
    'FOR',
    'IF',
    'DO',
    'WHILE',
    'ELSE',
    'LPAREN',
    'RPAREN',
)

t_FOR = r'for'
t_IF = r'if'
t_DO = r'do'
t_WHILE = r'while'
t_ELSE = r'else'
t_LPAREN = r'\('
t_RPAREN = r'\)'

t_ignore  = ' \t'

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
        lexer.input(content)
        result = []
        for tok in lexer:
            result.append(f"Line {tok.lineno}: <Reservada {tok.type}> Simbolo: {tok.value}")
        return '\n'.join(result)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    host = os.getenv('HOST')
    port = int(os.getenv('PORT'))
    app.run(debug=True, host=host, port=port)