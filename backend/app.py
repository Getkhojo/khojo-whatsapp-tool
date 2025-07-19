
from flask import Flask, request, jsonify
import openai
import os

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/generate", methods=["POST"])
def generate_message():
    data = request.json
    category = data.get("category")
    purpose = data.get("purpose")
    prompt = f"Generate a professional WhatsApp message for a {category} business that is about {purpose}."
    
    resp = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[{"role":"user", "content":prompt}],
        max_tokens=200,
    )
    message = resp.choices[0].message.content
    return jsonify({"message": message})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
