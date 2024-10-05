from flask import Flask, jsonify, send_from_directory
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from backend.models import db
from backend.config import Config

# Create Flask app
app = Flask(__name__)
# app = Flask(__name__, static_folder='build', static_url_path='')
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
jwt = JWTManager(app)
CORS(app)

# @app.route('/')
# def serve():
#     return send_from_directory(app.static_folder, 'index.html')

# @app.errorhandler(404)
# def not_found(e):
#     return send_from_directory(app.static_folder, 'index.html')

@jwt.expired_token_loader
def expired_token_callback(header, payload):
    return jsonify({
        "error": "Token has expired",
        "message": "Please log in again."
    }), 401

# Import routes
from backend.routes.auth import auth_bp
from backend.routes.project import project_bp
from backend.routes.team import team_bp

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(project_bp, url_prefix='/api/projects')
app.register_blueprint(team_bp, url_prefix='/api/teams')

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
