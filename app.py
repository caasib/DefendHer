from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

users = {'exampleuser':'examplepass', 'admin':'innovateher'}

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    username = request.form['username']
    password = request.form['password']
    if request.method == 'POST':
        if username in users.keys and password == users[username]:
            return redirect(url_for('Courses'))
        else:
            error = "Invalid credentials. Please try again."
    return render_template('login.html', error=error)
