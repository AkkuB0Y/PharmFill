from flask import Blueprint, Flask, request, jsonify, send_file, url_for
from flask_restful import Resource, Api
import redis
import uuid
from PIL import Image
from io import BytesIO
import base64
import io

image = Blueprint('image', __name__)

r = redis.Redis(
  host='redis-19982.c259.us-central1-2.gce.cloud.redislabs.com',
  port=19982,
  password='4pjeX1Xg4W38pdG4tW86hxv8QQmNtVLg')

@image.route('/upload-image', methods=['POST'])
def upload_image():
    image_file = request.files['image']
    if image_file:
        image_id = str(uuid.uuid4())

        img = Image.open(image_file)
        img_byte_arr = BytesIO()
        img.save(img_byte_arr, format='PNG')
        img_byte_arr = img_byte_arr.getvalue()

        r.set(image_id, base64.b64encode(img_byte_arr).decode())

        imageURL = request.url_root.rstrip('/') + url_for('getURL', image_id = image_id)

        return jsonify({'imageURL': imageURL})
    else:
        return jsonify({'message': 'No images provided'}), 400
        

@image.route('/sayhi', methods=['POST'])
def sayhi():
    return jsonify({'message': 'Hello'})


@image.route('/getURL/<image_id>', methods=['GET'])
def getURL(image_id):
    imageData = r.get(image_id)
    if imageData:
        image_bytes = base64.b64decode(imageData)
        return send_file(io.BytesIO(image_bytes), mimetype='image/png')
    else:
        return jsonify({'message': 'Image not found'})
