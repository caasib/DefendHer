from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from transformers import GPT2Tokenizer, GPT2LMHeadModel
import secrets
import json

app = Flask(__name__, static_url_path='/static')
app.secret_key = secrets.token_urlsafe(32)

tokenizer = GPT2Tokenizer.from_pretrained("distilgpt2")
model = GPT2LMHeadModel.from_pretrained("distilgpt2")

@app.route('/m1quiz')
def m1quiz():
    return render_template('M1quiz.html')

@app.route('/wip')
def wip():
    return render_template('wip.html')

@app.route('/c1m1')
def c1m1():
    return render_template('C1M1.html')

@app.route('/courses')
def courses():
    return render_template('courses.html')



@app.route('/', methods=['GET', 'POST'])
def homepage():
    return render_template('index.html')

@app.after_request
def store_visited_url(r):
    session['url'] = request.url
    session.modified = True
    return r

def save_users(users):
    with open("users.json", "w") as file:
        json.dump(users, file)

def load_users():
    with open("users.json", "r") as file:
        return json.load(file)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    error = None
    if request.method == 'POST':
        users = load_users()
        username = request.form['username']
        password = request.form['password']
        if username in users:
            error = "This username is already taken."
        else:
            users[username] = password # worlds least secure user authentication
            save_users(users)
            return render_template('quiz.html')
    return render_template('signup.html', error=error)

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        users = load_users()
        username = request.form['username']
        password = request.form['password']  
        if username in users and password == users[username]:
            return render_template('front.html')
        else:
            error = "Invalid credentials. Please try again."
    return render_template('login.html', error=error)

@app.route('/logout')
def logout():
    # Clear the user's session data
    session.clear()
    # Redirect the user to the home page or a login page
    return redirect(url_for('homepage'))

@app.route('/Courses', methods=['GET', 'POST'])
def course_page():
    return render_template('Courses.html')

@app.route('/Modules', methods=['GET', 'POST'])
def modules_page():
    return render_template('Course1.html')

@app.route('/Practice', methods=['GET', 'POST'])
def practice_page():
    error = None
    if request.method == 'POST':
        response = request.json['input']  # Corrected to use request.json and access the 'input' key
        input_ids = tokenizer.encode(response, return_tensors='pt')
        output = model.generate(input_ids, max_length=50, num_return_sequences=1)
        generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
        return jsonify({"generated_text": generated_text})  # Corrected to use dictionary for jsonify
    return render_template('Practice.html')

@app.route('/front', methods=['GET', 'POST'])
def front_page():
    data = []
    if 'urls' in session:
        data = session['urls']
    return render_template('front.html', data=data)

@app.route('/ModulePage', methods=['GET', 'POST'])
def module_page():
    return render_template('ModulePage.html')

@app.route('/Course1', methods=['GET', 'POST'])
def course_one():
    return render_template('Course1.html')

if __name__ == "__main__":
    app.run()