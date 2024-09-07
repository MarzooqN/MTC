from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db, Project, Member
from config import Config

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/mtc'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)

@app.route('/api/projects', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    project_list = []

    for project in projects:
        project_data = {
            'id': project.id,
            'title': project.title,
            'description': project.description,
            'languages': project.languages,
            'members_count': len(project.members)
        }
        project_list.append(project_data)

    return jsonify(project_list)

@app.route('/api/projects/<int:id>', methods=['GET'])
def get_project(id):
    project = Project.query.get_or_404(id)
    project_data = {
        'id': project.id,
        'title': project.title,
        'description': project.description,
        'languages': project.languages,
        'members': [{'name': member.name, 'role': member.role, 'email': member.email} for member in project.members],
        'members_count': len(project.members)
    }
    return jsonify(project_data)


if __name__ == '__main__':
    app.run(debug=True)
