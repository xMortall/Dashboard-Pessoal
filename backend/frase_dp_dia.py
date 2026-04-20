from bibliotecas import requests, Flask, jsonify, CORS

app = Flask(__name__)
CORS(app)
url = "https://zenquotes.io/api/random"

def pegar_frase():
    try:
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            frase = data[0]['q'] + " - " + data[0]['a']
            return frase
        else:
            return "Não foi possível gerar a frase."
    except Exception as e:
        return "Ocorreu um erro ao pegar a frase: " + str(e)

@app.route("/frase")
def frase():
    return jsonify({"frase": pegar_frase()})

if __name__ == '__main__':
    app.run(debug=True)   
