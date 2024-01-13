from flask import Flask

from routes.scan import scan  # Importing the Blueprint


app = Flask(__name__)

app.register_blueprint(scan, url_prefix='/scan')  # Registering the Blueprint


@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
