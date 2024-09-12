import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://localhost/mtc'
    SQLALCHEMY_TRACK_MODIFICATIONS = False  
    JWT_SECRET_KEY = 'secret'

