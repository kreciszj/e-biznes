from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os, requests, random, logging

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

def call_llm(payload: dict) -> dict | None:
    headers = {"Authorization": f"Bearer {TOGETHER_API_KEY}", "Content-Type": "application/json"}
    try:
        r = requests.post(API_URL, headers=headers, json=payload, timeout=60)
        if r.status_code == 200 and "choices" in r.json():
            return r.json()["choices"][0]["message"]
        logging.error("LLM error %s: %s", r.status_code, r.text[:200])
    except Exception as e:
        logging.error("LLM request failed: %s", e)
    return None

@app.get("/start")
async def start_conversation():
    return {"message": random.choice(greetings)}

@app.get("/end")
async def end_conversation():
    return {"message": random.choice(farewells)}

@app.post("/chat")
async def chat(req: ChatRequest):
    prompt = (
        "Jesteś pomocnym asystentem linii lotniczej o nazwie LOT,"
        "Najpierw oceń temat pytania użytkownika - jeśli nie dotyczny on linii lotniczej lub tematów z nią związanych,"
        "odpowiedz dokładnie 'REJECT'."
        "Jeśli temat pasuje, odpowiedz normalnie."
    )
    payload = {
        "model": MODEL,
        "temperature": 0.7,
        "messages": [
            {"role": "system", "content": prompt},
            {"role": "user",   "content": req.message}
        ]
    }

    ans = call_llm(payload)
    if ans is None:
        return {"error": "Nie można uzyskać odpowiedzi od modelu."}

    content = ans["content"].strip()
    if content.startswith("REJECT"):
        return {"response": "Możemy rozmawiać wyłącznie o kwestiach związanych z linią lotniczą LOT"}

    return {"response": content}
