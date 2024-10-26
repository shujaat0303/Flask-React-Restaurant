from flask import Flask, render_template, request, jsonify,g
from flask_cors import CORS
import json
import sqlite3

app = Flask(__name__)
CORS(app)
app.config['DATABASE'] = 'test.db'


@app.teardown_appcontext
def close_db(error):
    db = g.pop('db', None)
    if db is not None:
        db.close()

def get_db():
  if 'db' not in g:
      g.db = sqlite3.connect('test.db')
      g.db.row_factory = sqlite3.Row
  return g.db




@app.route('/')
def home():
    return render_template('index.html')


# Get character data
@app.route('/api/characters', methods=['GET'])
def get_characters():
    # setting up database
    db = get_db()
    ans = db.execute('Select * from characters;').fetchall()
  
    return json.dumps([dict(row) for row in ans])

# Get character data
@app.route('/api/character/<id>', methods=['GET'])
def get_character(id):
    # setting up database
    db = get_db()
    ans = db.execute('Select * from characters where id=?;',(id)).fetchall()
  
    return json.dumps([dict(row) for row in ans])

# Set a character data
@app.route('/api/characters', methods=['POST'])
def set_characters():
    # setting up database
    db = get_db()
    name = request.json['name']
    job = request.json['job']
    db.execute('INSERT INTO characters (name, job) VALUES (?, ?);', (name, job))
    db.commit()
    return jsonify({'status': 'Character added'}), 201

# Set a character data
@app.route('/api/characters', methods=['DELETE'])
def delete_characters():
    # setting up database
    db = get_db()
    name = request.json['name']
    job = request.json['job']
    db.execute('DELETE from characters where name=? AND job=?;', (name, job))
    db.commit()
    return jsonify({'status': 'Character deleted'}), 200

# Set a character data
@app.route('/api/update_character', methods=['POST'])
def update_characters():
    # setting up database
    db = get_db()
    id = request.json['id']
    name = request.json['name']
    job = request.json['job']
    db.execute('UPDATE characters SET name=?, job=? WHERE id=?;', (name, job, id))
    db.commit()
    return jsonify({'status': 'Character updated'}), 200
  

# Test data 
@app.route('/data', methods=['GET'])
def get_data():
    data = {'message': 'Hello from Flask API!'}
    return jsonify(data)

# # API route that returns JSON data
# @app.route('/api/joke', methods=['GET'])
# def joke():
    
#     response = requests.get('https://official-joke-api.appspot.com/jokes/random/1')
    
#     return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)