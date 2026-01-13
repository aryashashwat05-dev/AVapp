from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
from threading import Lock
import json
import time

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

# Store connected clients and messages
clients = {}
messages = []
thread = None
thread_lock = Lock()

@app.route('/')
def index():
    return app.send_static_file('index.html')

@socketio.on('connect')
def handle_connect():
    print('Client connected:', request.sid)

@socketio.on('disconnect')
def handle_disconnect():
    if request.sid in clients:
        nickname = clients[request.sid]
        del clients[request.sid]
        print(f'Client disconnected: {nickname} ({request.sid})')
        socketio.emit('user_left', {'nickname': nickname, 'users': list(clients.values())})

@socketio.on('set_username')
def handle_set_username(data):
    nickname = data.get('nickname', 'Anonymous')
    clients[request.sid] = nickname
    print(f'User {nickname} connected with SID: {request.sid}')
    socketio.emit('user_joined', {'nickname': nickname, 'users': list(clients.values())})

@socketio.on('send_message')
def handle_send_message(data):
    nickname = clients.get(request.sid, 'Anonymous')
    message = data.get('message', '').strip()
    if message:
        message_data = {
            'nickname': nickname,
            'message': message,
            'timestamp': time.strftime('%H:%M:%S')
        }
        messages.append(message_data)
        socketio.emit('receive_message', message_data)

@socketio.on('typing')
def handle_typing():
    nickname = clients.get(request.sid, 'Anonymous')
    socketio.emit('user_typing', {'nickname': nickname}, broadcast=True, include_self=False)

if __name__ == '__main__':
    print('Starting server at http://localhost:5001')
    socketio.run(app, host='0.0.0.0', port=5001, debug=True)
