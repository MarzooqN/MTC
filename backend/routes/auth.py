from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import db, AppUser

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)  # Requires the refresh token
def refresh_token():
    user_id = get_jwt_identity()
    new_access_token = create_access_token(identity=user_id)
    
    return jsonify({"access_token": new_access_token}), 200

# Signup route
@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    name = data.get('name')

    # Validate email
    if not email.endswith('@buckeyemail.osu.edu'):
        return jsonify({"error": "Invalid email domain"}), 400

    if AppUser.query.filter_by(email=email).first():
        return jsonify({"error": "User already exists"}), 400

    # Create user
    new_user = AppUser(email=email, name=name)
    new_user.set_password(data.get('password'))
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

# Login route
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = AppUser.query.filter_by(email=data.get('email')).first()

    if user and user.check_password(data.get('password')):
        token = create_access_token(identity=user.id)
        return jsonify({"token": token}), 200
    return jsonify({"error": "Invalid credentials"}), 401

@auth_bp.route('/user-info', methods=['GET', 'OPTIONS'])
@jwt_required()  # Ensure the user is authenticated for GET requests
def user_info():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'OK'}), 200  # Handle preflight requests

    user_id = get_jwt_identity()  # Get the logged-in user's ID
    user = AppUser.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Return user's ID and role
    return jsonify({
        "id": user.id,
        "email": user.email,
        "role": user.role,
        "name": user.name
    }), 200
