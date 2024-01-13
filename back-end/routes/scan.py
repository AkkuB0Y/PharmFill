from flask import Blueprint, jsonify, request

import http.client
import typing
import urllib.request
from vertexai.preview.generative_models import GenerativeModel, Image

scan = Blueprint('scan', __name__)



# create helper function
def load_image_from_url(image_url: str) -> Image:
    with urllib.request.urlopen(image_url) as response:
        response = typing.cast(http.client.HTTPResponse, response)
        image_bytes = response.read()
    return Image.from_bytes(image_bytes)


@scan.route('/convert-text', methods=['GET'])
def convert_text():

# Load images from Cloud Storage URI
landmark1 = load_image_from_url(
    "https://storage.googleapis.com/cloud-samples-data/vertex-ai/llm/prompts/landmark1.png"
)
landmark2 = load_image_from_url(
    "https://storage.googleapis.com/cloud-samples-data/vertex-ai/llm/prompts/landmark2.png"
)
landmark3 = load_image_from_url(
    "https://storage.googleapis.com/cloud-samples-data/vertex-ai/llm/prompts/landmark3.png"
)


# Pass multimodal prompt
model = GenerativeModel("gemini-pro-vision")
response = model.generate_content(
    [
        landmark1,
        "city: Rome, Landmark: the Colosseum",
        landmark2,
        "city: Beijing, Landmark: Forbidden City",
        landmark3,
    ]
)
print(response)

    return jsonify({"response": "HELLO"}), 200
