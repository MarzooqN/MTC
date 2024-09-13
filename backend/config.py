import os
from datetime import timedelta

class Config:
    # SQLALCHEMY_DATABASE_URI = 'postgresql://localhost/mtc'
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres.hmaxrfgiwsjevapezvwv:MTCDATABASEPASSWORD!@aws-0-us-east-2.pooler.supabase.com:6543/postgres'
    SQLALCHEMY_TRACK_MODIFICATIONS = False  
    JWT_SECRET_KEY = 'secret'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)

