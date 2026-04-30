from flask import Flask
from flask_cors import CORS

from routes.tasks import tasks_bp
from routes.frase import frase_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(tasks_bp)
app.register_blueprint(frase_bp)


if __name__ == '__main__':
    app.run(port=6767)