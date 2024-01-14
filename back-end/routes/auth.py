from flask import Flask, Blueprint, request, jsonify, session
from flask_session import Session
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')

import redis
import bcrypt


r = redis.Redis(
  host='redis-19982.c259.us-central1-2.gce.cloud.redislabs.com',
  port=19982,
  password='4pjeX1Xg4W38pdG4tW86hxv8QQmNtVLg')


auth = Blueprint('auth', __name__)

Session(app)

@auth.route('/hi', methods=['GET'])
def hi():
    return jsonify({'message': 'Hi'})


@auth.route('/create', methods=['POST'])
def create():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password').encode('utf-8')

    if r.sismember('usernames', username):
        return jsonify({'message': 'Username already exists'}), 409

    hashedPassword = bcrypt.hashpw(password, bcrypt.gensalt())

    r.set(username, hashedPassword.decode('utf-8'))
    session['user'] = username

    r.sadd('usernames', username)

    return "User successfully created"


@auth.route('/login', methods=['POST', 'GET'])
def login():
    username = request.form['username']
    password = request.form['password']

    hashedPassword = r.get(username)
    if hashedPassword is not None:
        if bcrypt.checkpw(password, hashedPassword.encode('utf-8')):
            session['user'] = username
            return jsonify({'message': 'Login successful', "username": username})
        else:
            return jsonify({'message': 'Invalid credentials'}), 401
    else:
        return "User not found"

@auth.route('/logout')
def logout():
    session.pop('user', None)

    return jsonify({'message': 'Logged out successfully'})

@auth.route('/editUserProfile', methods=['POST'])
def editUserProfile(): 
    if 'user' not in session:
        return jsonify({'message': 'User not logged in'}), 401

    age = request.form['age']
    name = request.form['name']
    city = request.form['city']
    province = request.form['province']
    phoneNumber = request.form['phone number']
    postalCode = request.form['postal code']

    user_info = {
        'patientAge': age,
        'patientName': name,
        'patientCity': city,
        'patientProvince': province,
        'patientPhone number': phoneNumber,
        'patientPostalCode': postalCode,
    }

    r.hmset(f"{session['user']}:info", user_info)

    return "User profile successfully changed"

@auth.route('/editDoctorProfile', methods=['POST'])
def editDoctorProfile(): 
    if 'user' not in session:
        return jsonify({'message': 'User not logged in'}), 401
    
    name = request.form['name']

    doctor_info = {
        'doctorName': name
    }

    r.hmset(f"{session['user']}:info", doctor_info)

    return "Doctor profile successfully changed"

@auth.route('/editPharmacyProfile', methods=['POST'])
def editPharmacyProfile(): 
    if 'user' not in session:
        return jsonify({'message': 'User not logged in'}), 401
    
    name = request.form['name']
    phoneNumber = request.form['phone number']
    address = request.form['address']

    pharmacy_info = {
        'pharmacyName': name,
        'pharmacyPhoneNumber': phoneNumber,
        'pharmacyAddress': address
    }

    r.hmset(f"{session['user']}:info", pharmacy_info)

    return "Doctor profile successfully changed"


if __name__ == '__main__':
    app.run(debug=True)
