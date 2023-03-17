from flask import Flask, request
import json
import requests
from dotenv import load_dotenv
import os
from flask_cors import CORS

load_dotenv()


app = Flask(__name__)
CORS(app)
API_KEY = os.getenv("BACKEND_API_KEY")

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/api/gpt-3', methods=['POST'])
def gpt3():
    print("request received")
    data = request.json
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json',
        'User-Agent': 'openai.python'
    }
    response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=data)

    if response.status_code == 200:
        return response.json()
    else:
        return {
            "error": f"An error occurred while processing the request. Status code: {response.status_code}, Response content: {response.content}"
        }, response.status_code

@app.route('/test-gpt3')
def test_gpt3():
    data = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "system",
                "content": "You are ChatGPT."
            },
            {
                "role": "user",
                "content": "What is the capital of France?"
            }
        ]
    }
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json',
        'User-Agent': 'openai.python'
    }
    response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=data)

    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "An error occurred while processing the request."}, response.status_code


if __name__ == '__main__':
    app.run(debug=True)

