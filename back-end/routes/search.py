from flask import Flask, request, jsonify, Blueprint
import redis
import threading
import functools

def debounce(wait):
    def decorator(fn):
        def debounced(*args, **kwargs):
            def call_it():
                fn(*args, **kwargs)

            if hasattr(debounced, '_timer'):
                debounced._timer.cancel()

            debounced._timer = threading.Timer(wait, call_it)
            debounced._timer.start()

        return functools.update_wrapper(debounced, fn)

    return decorator

search = Flask(__name__)

search = Blueprint('search', __name__)

r = redis.Redis(
  host='redis-19982.c259.us-central1-2.gce.cloud.redislabs.com',
  port=19982,
  password='4pjeX1Xg4W38pdG4tW86hxv8QQmNtVLg')

@search.route('/findPatient', __name__)
@debounce(0.5) 
def findPatient():
    query = request.args.get('query','').lower()

    if not query:
        return jsonify([])
    
    all_usernames = r.smembers('usernames')
    matching_usernames = [username for username in all_usernames if query in username.lower().startswith(query)]

    return jsonify(matching_usernames[:5])