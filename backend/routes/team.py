from flask import Blueprint, request, jsonify
from backend.models import HackathonTeam, AppUser, TeamMember, db
from flask_jwt_extended import jwt_required, get_jwt_identity

team_bp = Blueprint('team_bp', __name__)

# Get all hackathon teams
@team_bp.route('/', methods=['GET'])
def get_teams():
    teams = HackathonTeam.query.all()
    teams_data = [{
        'id': team.id,
        'team_name': team.team_name,
        'members': [{'name': member.name, 'email': member.email} for member in team.members]
    } for team in teams]

    return jsonify(teams_data), 200

# Create a new hackathon team
@team_bp.route('/add', methods=['POST'])
@jwt_required()
def create_team():
    data = request.get_json()
    user_id = get_jwt_identity()

    team = HackathonTeam(team_name=data['team_name'])
    user = AppUser.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    team.members.append(user)  # Add creator as the first member of the team
    db.session.add(team)
    db.session.commit()

    return jsonify({"message": "Team created successfully!"}), 201

# Join a hackathon team
@team_bp.route('/join/<int:team_id>', methods=['POST'])
@jwt_required()
def join_team(team_id):
    user_id = get_jwt_identity()
    user = AppUser.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    team = HackathonTeam.query.get(team_id)
    if not team:
        return jsonify({"error": "Team not found"}), 404

    if user not in team.members:
        team.members.append(user)
        db.session.commit()

    return jsonify({"message": "Joined the team successfully!"}), 200
