from flask import Flask
from flask_cors import CORS

from routes.scan import scan  # Importing the Blueprint
from routes.auth import auth
from routes.image import image
from routes.annotate import annotate


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # Allow only specific origin

app.register_blueprint(scan, url_prefix='/scan')  # Registering the Blueprint
app.register_blueprint(auth, url_prefix='/login')
app.register_blueprint(image, url_prefix='/image')
app.register_blueprint(annotate, url_prefix='/annotate')

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
