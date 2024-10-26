import sqlite3

# Connect to SQLite database (or create it)
conn = sqlite3.connect('test.db')
cursor = conn.cursor()

# Create the table if it doesn't exist
cursor.execute('''
    CREATE TABLE IF NOT EXISTS characters (
        name TEXT,
        job TEXT
    )
''')

# JSON data to insert
data = [
    {'name': 'Charlie', 'job': 'Janitor'},
    {'name': 'Mac', 'job': 'Bouncer'},
    {'name': 'Dee', 'job': 'Aspiring actress'},
    {'name': 'Dennis', 'job': 'Bartender'}
]

# Insert the data into the characters table
for entry in data:
    cursor.execute('''
        INSERT INTO characters (name, job)
        VALUES (?, ?)
    ''', (entry['name'], entry['job']))

# Commit the changes and close the connection
conn.commit()
conn.close()
