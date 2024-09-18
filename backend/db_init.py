# from backend.app import app
# from backend.models import db, AppUser, Project

# with app.app_context():
#     db.create_all()

#     # Add sample users
#     user1 = AppUser(email="john.doe@buckeyemail.osu.edu")
#     user1.set_password("password123")
#     user1.role = "admin"
#     user1.name = "John Doe"

#     user2 = AppUser(email="jane.smith@buckeyemail.osu.edu")
#     user2.set_password("password123")
#     user2.name = "Jane Smith"

#     user3 = AppUser(email="alice.johnson@buckeyemail.osu.edu")
#     user3.set_password("password123")
#     user3.name = "Alice Johnson"

#     db.session.add_all([user1, user2, user3])
#     db.session.commit()

#     # Add sample projects
#     project1 = Project(
#         title="AI-Based Fire Detection",
#         description="A project that detects fires using computer vision and AI.",
#         languages="Python, TensorFlow",
#         slack_link="https://slack.com/invite/ai-fire-detection",
#         purpose="Non-Profit",
#         created_by=user1.id
#     )

#     project2 = Project(
#         title="Web-Based Degree Planner",
#         description="A web app for students to plan their degree paths.",
#         languages="JavaScript, React, SQL",
#         slack_link="https://slack.com/invite/degree-planner",
#         purpose="Personal",
#         created_by=user2.id
#     )

#     db.session.add_all([project1, project2])
#     db.session.commit()

#     # Add members to projects
#     project1.members.append(user2)  # Add Jane Smith to AI-Based Fire Detection
#     project2.members.append(user1)  # Add John Doe to Web-Based Degree Planner
#     project2.members.append(user3)  # Add Alice Johnson to Web-Based Degree Planner

#     db.session.commit()

#     print("Sample users, projects, and members added.")
