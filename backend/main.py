from bibliotecas import Flask, datetime

app = Flask(__name__)

@app.route('/')
def dashboard():
    return """
    <h1>Minha Dashboard!</h1>
    <p>⏰ Hora: {{ hora }}</p>
    """.format(hora=datetime.now().strftime("%H:%M"))  # Troca depois por tempo real

if __name__ == '__main__':
    app.run(debug=True, port=5000)