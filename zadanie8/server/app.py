import os, datetime, uuid
from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from passlib.hash import bcrypt
import jwt
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ["SECRET_KEY"]
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///auth.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

class User(db.Model):
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

def generate_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "iat": datetime.datetime.utcnow(),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1),
        "jti": str(uuid.uuid4()),
    }
    return jwt.encode(payload, app.config["SECRET_KEY"], algorithm="HS256")

def verify_password(stored, plain) -> bool:
    return bcrypt.verify(plain, stored)

@app.route("/api/auth/login", methods=["POST"])
def login():
    body = request.get_json() or {}
    email = body.get("email", "").lower().strip()
    password = body.get("password", "")
    user: User | None = User.query.filter_by(email=email).first()
    if not user or not verify_password(user.password_hash, password):
        return jsonify({"error": "wrong credentials"}), 401

    token = generate_token(user.id)
    resp = make_response({"token": token})
    resp.set_cookie(
        "access_token", token, httponly=True, samesite="Lax",
        secure=False, max_age=3600, path="/"
    )
    return resp

@app.route("/api/me", methods=["GET"])
def me():
    raw = request.cookies.get("access_token") or request.headers.get("Authorization", "").removeprefix("Bearer ")
    if not raw:
        return "", 401
    try:
        claims = jwt.decode(raw, app.config["SECRET_KEY"], algorithms=["HS256"])
        user = User.query.get(claims["sub"])
        return {"id": user.id, "email": user.email}
    except Exception:
        return "", 401

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        if not User.query.filter_by(email="admin@admin").first():
            db.session.add(User(email="admin@admin", password_hash=bcrypt.hash("admin")))
            db.session.commit()
    app.run(port=8080)
