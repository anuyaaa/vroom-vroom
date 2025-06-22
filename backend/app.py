from flask import Flask, render_template, request, redirect, url_for, flash
import sqlite3

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Needed for flash messages

# --- Database Connection ---
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

# --- Home Page with Dropdown Filters ---
@app.route('/')
def home():
    conn = get_db_connection()
    brands = conn.execute('SELECT DISTINCT brand FROM cars').fetchall()
    models = conn.execute('SELECT DISTINCT name FROM cars').fetchall()
    conn.close()
    return render_template('home.html', brands=brands, models=models)

# --- Filtered Car Listings ---
@app.route('/category')
def category():
    brand = request.args.get('brand')
    model = request.args.get('model')

    conn = get_db_connection()

    query = "SELECT * FROM cars WHERE 1=1"
    params = []

    if brand:
        query += " AND brand = ?"
        params.append(brand)
    if model:
        query += " AND name = ?"
        params.append(model)

    cars = conn.execute(query, params).fetchall()
    conn.close()

    return render_template('category.html', cars=cars)

# --- Car Detail Page ---
@app.route('/car/<int:car_id>')
def car_detail(car_id):
    conn = get_db_connection()
    car = conn.execute('SELECT * FROM cars WHERE id = ?', (car_id,)).fetchone()
    conn.close()

    if car is None:
        return "Car not found", 404

    return render_template('car_detail.html', car=car)

# --- Add Car Page (GET + POST) ---
@app.route('/add', methods=['GET', 'POST'])
def add_car():
    if request.method == 'POST':
        name = request.form['name']
        brand = request.form['brand']
        body_type = request.form['body_type']
        engine = request.form['engine']
        price = request.form['price']
        image_path = request.form['image_path']
        model_path = request.form['model_path']
        description = request.form['description']

        conn = get_db_connection()
        conn.execute('''
            INSERT INTO cars (name, brand, body_type, engine, price, image_path, model_path, description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (name, brand, body_type, engine, price, image_path, model_path, description))
        conn.commit()
        conn.close()

        flash('Car added successfully!')
        return redirect(url_for('home'))

    return render_template('add_car.html')

# --- Run the App ---
if __name__ == '__main__':
    app.run(debug=True)
