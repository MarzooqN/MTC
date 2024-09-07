from app import app
from models import db, Project, Member

# Create the database and add sample data
with app.app_context():
    db.create_all()

    # Add sample projects
    if not Project.query.all():
        project1 = Project(
            title='AI-Based Fire Detection',
            description='A project that detects fires using computer vision and AI.',
            languages='Python, TensorFlow'
        )
        project2 = Project(
            title='Web-Based Degree Planner',
            description='A web app for students to plan their degree paths.',
            languages='JavaScript, React, SQL'
        )

        db.session.add_all([project1, project2])
        db.session.commit()

        # Add sample members to project1
        member1 = Member(
            name='John Doe',
            email='john.doe@example.com',
            project_id=project1.id,
            role='Lead Developer'
        )
        member2 = Member(
            name='Jane Smith',
            email='jane.smith@example.com',
            project_id=project1.id,
            role='Data Scientist'
        )

        # Add sample members to project2
        member3 = Member(
            name='Alice Johnson',
            email='alice.johnson@example.com',
            project_id=project2.id,
            role='Frontend Developer'
        )
        member4 = Member(
            name='Bob Brown',
            email='bob.brown@example.com',
            project_id=project2.id,
            role='Backend Developer'
        )

        db.session.add_all([member1, member2, member3, member4])
        db.session.commit()

    print("Sample projects and members added.")
