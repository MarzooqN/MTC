from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.models import db, Project, AppUser
import requests
import os
from dotenv import load_dotenv

load_dotenv()

project_bp = Blueprint('project', __name__)


def send_slack_message(project_title, creator_name, project_purpose, description):
    url = os.getenv('SLACK_URL')

    slack_data = {
        "text": f"New Project Created: *{project_title}*\nDescription: {description}\nCreated by: {creator_name}\nPurpose: {project_purpose}"
    }

    try:
        response = requests.post(url, json=slack_data)
        response.raise_for_status() #If bad status code then raises error
    except Exception as e:
        print(f"Error sending slack message: {e}")



# Add new project
@project_bp.route('/add', methods=['POST', 'OPTIONS'])
@jwt_required()  # Ensure the user is authenticated
def create_project():

    if request.method == 'OPTIONS':
        return jsonify({'status': 'OK'}), 200  # Handle preflight requests

    user_id = get_jwt_identity()  # Get the logged-in user's ID
    data = request.get_json()

    # Extract project details from the request
    title = data.get('title')
    description = data.get('description')
    languages = data.get('languages')
    slack_link = data.get('slack_link')
    purpose = data.get('purpose')

    # Check for missing fields
    if not title or not description or not languages or not slack_link or not purpose:
        return jsonify({"error": "Missing required fields"}), 400

    # Create a new project
    new_project = Project(
        title=title,
        description=description,
        languages=languages,
        slack_link=slack_link,
        purpose=purpose,
        created_by=user_id
    )

    # Add the creator to the project's members
    creator = AppUser.query.get(user_id)
    new_project.members.append(creator)

    # Add the project to the database
    db.session.add(new_project)
    db.session.commit()

    send_slack_message(project_title=title, creator_name=creator.name, project_purpose=purpose, description=description)

    return jsonify({"message": "Project created successfully", "project_id": new_project.id}), 201

#Deleting Projects
@project_bp.route('/delete/<int:id>', methods=['DELETE'])
@jwt_required()  # Ensure the user is authenticated
def delete_project(id):
    user_id = get_jwt_identity()
    project = Project.query.get(id)

    if not project:
        return jsonify({"error": "Project not found"}), 404

    user = AppUser.query.get(user_id)

    # Only the project creator or an admin can delete the project
    if project.created_by != user_id and user.role != 'admin':
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(project)
    db.session.commit()

    return jsonify({"message": "Project deleted successfully"}), 200


# Get all projects
@project_bp.route('/', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    project_list = []
    for project in projects:
        project_data = {
            'id': project.id,
            'title': project.title,
            'description': project.description,
            'languages': project.languages,
            'slack_link': project.slack_link,
            'purpose': project.purpose,
            'created_by': project.created_by,
            'member_count': len(project.members)
        }
        project_list.append(project_data)

    return jsonify(project_list)


@project_bp.route('/<int:id>', methods=['GET'])
def get_project(id):
    project = Project.query.get_or_404(id)
    project_data = {
        'id': project.id,
        'title': project.title,
        'description': project.description,
        'languages': project.languages,
        'members': [{'name': member.name, 'role': member.role, 'email': member.email} for member in project.members],
        'purpose': project.purpose,
        'created_by': project.created_by
    }
    return jsonify(project_data)

@project_bp.route('/slack/<int:id>', methods=['GET', 'OPTIONS'])
@jwt_required()
def get_slack_link(id):

    if request.method == 'OPTIONS':
        return jsonify({'status': 'OK'}), 200  # Handle preflight requests
    

    @jwt_required()
    def get_link():
        user_id = get_jwt_identity()
        project = Project.query.get(id)
        if not project:
            return jsonify({"error": "Project not found"}), 404
        
        user = AppUser.query.get(user_id)

        if user not in project.members:
            project.members.append(user)  # Add the user to the project's members
            db.session.commit()

        return jsonify({"slack_link": project.slack_link})

    
    return get_link()

