from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

users = {'example':'example', 'admin':'innovateher', 'your':'mom'}

@app.route('/', methods=['GET', 'POST'])
def homepage():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']  
        if username in users.keys() and password == users[username]:
            return render_template('Courses.html')
        else:
            error = "Invalid credentials. Please try again."
    return render_template('login.html', error=error)

@app.route('/Courses', methods=['GET', 'POST'])
def course_page():
    return render_template('Courses.html')


if __name__ == "__main__":
    app.run()
