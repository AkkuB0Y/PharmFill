from flask import Blueprint, jsonify, request

import http.client
import typing
import urllib.request
import vertexai
from vertexai.preview.generative_models import GenerativeModel, Image

import os
from dotenv import load_dotenv

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "../GACKey.json"

load_dotenv()
PROJECT_ID = os.getenv('PROJECT_ID')
LOCATION = os.getenv('LOCATION')
CODE_CHAT_MODEL = os.getenv('CODE_CHAT_MODEL')

vertexai.init(project=PROJECT_ID, location=LOCATION)


scan = Blueprint('scan', __name__)

# create helper function
def load_image_from_url(image_url: str) -> Image:
    req = urllib.request.Request(
        image_url, 
        headers={'User-Agent': 'Mozilla/5.0'}
    )
    with urllib.request.urlopen(req) as response:
        response = typing.cast(http.client.HTTPResponse, response)
        image_bytes = response.read()
    return Image.from_bytes(image_bytes)


@scan.route('/say-hi', methods=['GET'])
def say_hi():
    return jsonify({"message": "Hi"}), 200

@scan.route('/convert-text', methods=['GET'])
def convert_text():
    # Load images from Cloud Storage URI
    image = load_image_from_url(
        "https://cdn.discordapp.com/attachments/1187776063284195393/1195838041667940372/sample_prescription.png?ex=65b571f6&is=65a2fcf6&hm=08daa708feb1170befdacaeb1d54054c6ee2f983dae57a396e640c4d29d67c41&"
    )

    # Pass multimodal prompt
    model = GenerativeModel(CODE_CHAT_MODEL)
    response = model.generate_content(
        [
            image,
            "Tell me what's written in this prescription."
        ]
    )
    print(response)

    return jsonify({"response": response.text}), 200
