from flask import Flask, Blueprint, request, jsonify, session
from flask_session import Session
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)

import redis
import bcrypt

r = redis.Redis(
  host='redis-19982.c259.us-central1-2.gce.cloud.redislabs.com',
  port=19982,
  password='4pjeX1Xg4W38pdG4tW86hxv8QQmNtVLg')

auth = Blueprint('auth', __name__)

Session(app)

@auth.route('/create', methods=['POST'])
def create():
    username = request.form['username']
    password = request.form['password'].encode('utf-8')

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
        'age': age,
        'name': name,
        'city': city,
        'province': province,
        'phone number': phoneNumber,
        'postal code': postalCode,
    }

    r.hmset(f"{session['user']}:info", user_info)

    return "User profile successfully changed"

@auth.route('/editDoctorProfile', methods=['POST'])
def editDoctorProfile(): 
    if 'user' not in session:
        return jsonify({'message': 'User not logged in'}), 401
    
    name = request.form['name']

    doctor_info = {
        'name': name
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
        'name': name,
        'phone number': phoneNumber,
        'address': address
    }

    r.hmset(f"{session['user']}:info", pharmacy_info)

    return "Doctor profile successfully changed"


if __name__ == '__main__':
    app.run(debug=True)
