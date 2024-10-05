from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

# Association table for many-to-many relationship between Users and Projects
project_members = db.Table('project_members',
    db.Column('user_id', db.Integer, db.ForeignKey('app_user.id'), primary_key=True),
    db.Column('project_id', db.Integer, db.ForeignKey('project.id'), primary_key=True)
)

# User (AppUser) Model
class AppUser(db.Model):
    __tablename__ = 'app_user'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default="user")
    
    projects = db.relationship('Project', secondary=project_members, backref='members')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# Project Model
class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    languages = db.Column(db.String(200), nullable=False)
    slack_link = db.Column(db.String(300), nullable=False)
    purpose = db.Column(db.String(50), nullable=False)
    created_by = db.Column(db.Integer, db.ForeignKey('app_user.id'), nullable=False)

    creator = db.relationship('AppUser', backref='created_projects')

class HackathonTeam(db.Model):
    __tablename__ = 'hackathon_teams'
    id = db.Column(db.Integer, primary_key=True)
    team_name = db.Column(db.String(255), nullable=False)
    members = db.relationship('AppUser', secondary='team_members', backref='teams')

class TeamMember(db.Model):
    __tablename__ = 'team_members'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('app_user.id'))
    team_id = db.Column(db.Integer, db.ForeignKey('hackathon_teams.id'))
