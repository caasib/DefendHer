from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

users = {'exampleuser':'examplepass', 'admin':'innovateher'}

@app.route('/', methods=['GET', 'POST'])
def homepage():
    return render_template('login.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']  
        if username in users.keys() and password == users[username]:
            error = "Yay!"
        else:
            error = "Invalid credentials. Please try again."
    return render_template('login.html', error=error)

if __name__ == "__main__":
    app.run()
