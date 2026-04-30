# =========================================================
# PROJET: Api Resquest (zenquotes.io)
# VERSION: 0.0.1
# @AUTHOR: Emanuel Borges
# DATA: 28/05/2023
# =========================================================
# *DESCRIPTION:
# This script is a simple flask API that returns a 
# random quote from zenquotes.io
# =========================================================

from flask import jsonify, Blueprint, request

frase_bp = Blueprint("frase", __name__)

url = "https://zenquotes.io/api/random"

def pegar_frase():
    try:
        response = request.get(url)
        if response.status_code == 200:
            data = response.json()
            frase = data[0]['q'] + " - " + data[0]['a']
            return frase
        
        else:
            return "Não foi possível gerar a frase."
    except Exception as e:
        return "Ocorreu um erro ao pegar a frase: " + str(e)

@frase_bp.route("/api/frase")
def frase():
    return jsonify({"frase": pegar_frase()})