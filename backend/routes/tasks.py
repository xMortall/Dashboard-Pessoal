# =========================================================
# PROJET: See Task List
# VERSION: 0.0.1
# @AUTHOR: Emanuel Borges
# DATA: 29/05/2023
# =========================================================
# *DESCRIPTION:
# This script is a simple flask API that returns a
# database with tasks
# =========================================================

from flask import jsonify, Blueprint, request
from dotenv import load_dotenv
import mysql.connector as mysqlConnector
import os

load_dotenv("../.env")

tasks_bp = Blueprint("tasks", __name__)

db_config = {
    "host": os.getenv("DB_HOST"),
    "port": int(os.getenv("DB_PORT", 3306)),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_NAME")
}

def get_db_connection():
    return mysqlConnector.connect(**db_config)

class ValidarErros(Exception):
    """
    Erro de validação do input do utilizador
    """
    pass

class Task:
    def __init__(self, nome, completed):
        self.name = nome
        self.completed = completed

    @staticmethod
    def from_request(data: dict) -> "Task":
        nome = data.get("name")
        completed = data.get("completed")
        if completed is None:
            completed = False

        if not nome:
            raise ValidarErros("O campo 'name' é obrigatório")

        return Task(nome, completed)
        
    def as_db_tuple(self):
        return (self.name, self.completed)
    
    def as_public_dict(self, inserted_id=None):
        payload = {
            "name": self.name,
            "completed": self.completed
        }
        if inserted_id is not None:
            payload["id"] = inserted_id
        return payload
    
# -------------
# Rotas
# ------------- :D
@tasks_bp.route("/api/tasks", methods=["POST"])
def inserir_task():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"erro": "Json invalido ou vazio"}), 400

    try:
        task = Task.from_request(data)

        sql = """
            INSERT INTO tasks (name, completed)
            VALUES (%s, %s)"""
        
        conn = get_db_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(sql, task.as_db_tuple())
                conn.commit()
                new_id = cursor.lastrowid
        finally:
            conn.close()

        return jsonify({
            "mensagem": "Task criada com sucesso",
            "data": task.as_public_dict(inserted_id=new_id)
        }), 201
    except ValidarErros as ve:
        return jsonify({"erro": str(ve)}), 400
    
    except Exception as e:
        print("ERRO REAL:", e)
        return jsonify({"erro": str(e)}), 500
    
    except mysqlConnector.Error as err:
        return jsonify({"erro": str(err)}), 500
    
    except Exception:
        return jsonify({"erro": "Ocorreu um erro ao criar a task"}), 500

@tasks_bp.route("/api/tasks", methods=["GET"])
def listar_tasks():
    try:
        sql = """
        SELECT id, name, completed FROM tasks
        ORDER BY id DESC
        """
    
        conn = get_db_connection()
        try:
            with conn.cursor(dictionary=True) as cursor:
                cursor.execute(sql)
                rows = cursor.fetchall()
        finally:
            conn.close()

        return jsonify({
            "total": len(rows),
            "data": rows
        }), 200

    except mysqlConnector.Error as err:
        return jsonify({"erro": str(err)}), 500

    except Exception:
        return jsonify({"erro": "Ocorreu um erro ao listar as tasks"}), 500
    
@tasks_bp.route("/api/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    data = request.get_json()

    completed = data.get("completed")

    conn = get_db_connection()

    try:
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE tasks SET completed = %s WHERE id = %s",
            (completed, task_id)
        )
        conn.commit()

        return jsonify({"message": "Task atualizada"}), 200

    finally:
        conn.close()

@tasks_bp.route("/api/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):

    conn = get_db_connection()

    try:
        cursor = conn.cursor()
        cursor.execute(
            "DELETE FROM tasks WHERE id = %s",
            (task_id,)
        )
        conn.commit()

        return jsonify({"message": "Task deletada"}), 200

    finally:
        conn.close()