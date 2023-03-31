from cs50 import SQL
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token

app = Flask(__name__)
CORS(app)

app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change on production
jwt = JWTManager(app)


# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///data.db")

"""
python -m venv venv
venv\Scripts\activate
venv\Scripts\activate.bat
deactivate
------
pip install cs50
pip install Flask-Cors
pip install flask
pip install Flask-JWT-Extended
------
flask --app apiGetDashboared run
"""


# ----------------------------------------------- DataBase ----------------------------------------------- #
'''
CREATE TABLE userData (id INTEGER,
                    fname TEXT NOT NULL,
                    lname TEXT NOT NULL,
                    uname TEXT NOT NULL,
                    email TEXT NOT NULL,
                    password TEXT NOT NULL,
                    rule TEXT NOT NULL,
                    PRIMARY KEY(id)
                    );
'''
# ----------------------------------------------- globalQuery ----------------------------------------------- #
# globalQuery = db.execute("SELECT * FROM userData")
# print(globalQuery)
# ----------------------------------------------- home ----------------------------------------------- #


@app.route("/", methods=["GET"])
def home():
    return "Welcome to Flask BackEnd API Localhost:5000"
# ----------------------------------------------- login ----------------------------------------------- #


@app.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        incomming_data = request.get_json()
        email = incomming_data["email"]
        password = incomming_data["password"]
        # Query database for email
        rows_email = db.execute(
            "SELECT * FROM userData WHERE email = ?", email)
        # Ensure username exists and password is correct
        if len(rows_email) != 1:
            return {"status": "wrongEmail", "message": "Wrong : Email Not Existed"}
        if rows_email[0]["password"] != password:
            return {"status": "wrongPassword", "message": "Wrong : Wrong Password"}
        else:
            token = create_access_token(identity=rows_email[0])
            print("Login Done: ", email)
            return ({"status": "success", "message": 'Success : Logedin Successfully', "token": token})
# ----------------------------------------------- register ----------------------------------------------- #


@app.route("/register", methods=["POST"])
def register():
    if request.method == "POST":
        # print(request)
        incomming_data = request.get_json()
        fname = incomming_data["fname"]
        lname = incomming_data["lname"]
        uname = incomming_data["uname"]
        email = incomming_data["email"]
        image = incomming_data["image"]
        gender = incomming_data["gender"]
        password = incomming_data["password"]
        rule = "user"
        # Query database for username - check repeated email or username
        rows_email = db.execute(
            "SELECT * FROM userData WHERE email = ?", email)
        rows_uname = db.execute(
            "SELECT * FROM userData WHERE uname = ?", uname)
        if len(rows_email) >= 1:
            return {"status": "repeatedEmail", "message": "Failed : Repeated Email"}
        if len(rows_uname) >= 1:
            return {"status": "repeatedUname", "message": "Failed : Repeated Username"}
        if not fname or not lname or not email or not uname or not password:
            return {"status": "missingData", "message": "Failed : Didn't Get Nedded Data"}
        # Rgister in Data Base
        db.execute("INSERT INTO userData (fname,lname,uname,email,password,rule , image , gender ) VALUES(?, ?, ?, ?, ?,? , ? , ?)",
                   fname, lname, uname, email, password, rule, image, gender)
        return {"status": "success", "message": "Success : Registerd Successfully"}
# ----------------------------------------------- users ----------------------------------------------- #


@app.route("/users", methods=["GET"])
def users():
    globalQuery = db.execute("SELECT * FROM userData")
    return {"users": globalQuery}

# ----------------------------------------------- user Edit ----------------------------------------------- #


@app.route("/user/<id>", methods=["GET", "POST"])
def user(id):
    if request.method == "GET":
        user = db.execute("SELECT * FROM userData WHERE id = ?", id)
        return {"status": user, "message": "User Profile Data Return"}
    if request.method == "POST":
        incomming_data = request.get_json()
        fname = incomming_data["data"]["fname"]
        lname = incomming_data["data"]["lname"]
        uname = incomming_data["data"]["uname"]
        email = incomming_data["data"]["email"]
        password = incomming_data["data"]["password"]
        rule = incomming_data["data"]["rule"]
        image = incomming_data["data"]["image"]
        gender = incomming_data["data"]["gender"]
        id = incomming_data["id"]

        # Rgister in Data Base
        print(fname, lname, uname, email, password, rule, id, image, gender)
        db.execute("Update userData set fname = ?, lname = ? , uname = ?, email = ?, password = ?, rule = ? , image = ?, gender = ? where id = ?",
                   fname, lname, uname, email, password, rule, image, gender, id)
        # Query database for email
        rows_id = db.execute("SELECT * FROM userData WHERE id = ?", id)
        token = create_access_token(identity=rows_id[0])
        return {"status": "updated", "message": "Updated : User Profile Updated Successfully", "token": token}


# ----------------------------------------------- delete Edit ----------------------------------------------- #


@app.route("/user/<id>", methods=["DELETE"])
def deleteUser(id):
    if request.method == "DELETE":
        db.execute("DELETE FROM userData WHERE id = ?", id)
        return {"status": "deleted", "message": "Deleted : User Deleted Successfully"}
