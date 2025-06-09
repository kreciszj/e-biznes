from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os, requests, random

load_dotenv()
app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")
API_URL = "https://api.together.xyz/v1/chat/completions"
MODEL = "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"

greetings = [
    "Cześć! Jak mogę Ci dziś pomóc?",
    "Witaj! Co chciałbyś wiedzieć?",
    "Hej! Jestem tu, by odpowiedzieć na Twoje pytania.",
    "Dzień dobry! W czym mogę Ci pomóc?",
    "Cześć! Co Cię interesuje?"
]

farewells = [
    "Do zobaczenia! Mam nadzieję, że pomogłem.",
    "Na razie! Wracaj, jeśli będziesz miał pytania.",
    "Dziękuję za rozmowę. Trzymaj się!",
    "Miłego dnia! Do następnego razu.",
    "To wszystko z mojej strony. Cześć!"
]

class ChatRequest(BaseModel):
    message: str

@app.get("/start")
async def start_conversation():
    return {"message": random.choice(greetings)}

@app.get("/end")
async def end_conversation():
    return {"message": random.choice(farewells)}

@app.post("/chat")
async def chat(req: ChatRequest):
    headers = {"Authorization": f"Bearer {TOGETHER_API_KEY}", "Content-Type": "application/json"}
    payload = {"model": MODEL, "messages": [{"role": "user", "content": req.message}], "temperature": 0.7}
    r = requests.post(API_URL, headers=headers, json=payload, timeout=60)
    if r.status_code == 200:
        return {"response": r.json()["choices"][0]["message"]["content"].strip()}
    return {"error": r.text}
