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

import requests
from flask import jsonify, Blueprint

frase_bp = Blueprint("frase", __name__)

url = "https://fnaf-api.gsarvente.workers.dev/quotes/random"

def pegar_frase():
    _id_remove = {1, 3, 36, 37,38}
    _control_while:bool = True
    while _control_while:
        try:
            response = requests.get(url)
            if response.status_code == 200:
                data = response.json()
                if data["id"] in _id_remove:
                    continue
                else:
                    frase = data["quote"] + " - " + data["said"]
                    return frase
            
            else:
                return "Não foi possível gerar a frase."
        except Exception as e:
            return "Ocorreu um erro ao pegar a frase: " + str(e)

@frase_bp.route("/api/frase")
def frase():
    return jsonify({"frase": pegar_frase()})