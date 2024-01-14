from flask import Flask, Blueprint, request, jsonify, session
from flask_session import Session
from openai import OpenAI
import os

from dotenv import load_dotenv
load_dotenv()  # This loads the variables from .env into the environment

text = [
    {
      "ans": "",
      "text": "RX",
      "x1": 49,
      "x2": 94,
      "y1": 251,
      "y2": 269
    },
    {
      "ans": "",
      "text": "Patient",
      "x1": 49,
      "x2": 115,
      "y1": 299,
      "y2": 313
    },
    {
      "ans": "",
      "text": "Doctor Name",
      "x1": 49,
      "x2": 167,
      "y1": 404,
      "y2": 417
    },
    {
      "ans": "",
      "text": "Drug Name",
      "x1": 49,
      "x2": 142,
      "y1": 483,
      "y2": 501
    },
    {
      "ans": "",
      "text": "Drug Identification Number ( DIN )",
      "x1": 49,
      "x2": 310,
      "y1": 505,
      "y2": 523
    },
    {
      "ans": "",
      "text": "Cost",
      "x1": 49,
      "x2": 103,
      "y1": 545,
      "y2": 559
    },
    {
      "ans": "",
      "text": "Days",
      "x1": 416,
      "x2": 458,
      "y1": 506,
      "y2": 524
    },
    {
      "ans": "",
      "text": "Date of service",
      "x1": 503,
      "x2": 615,
      "y1": 250,
      "y2": 261
    },
    {
      "ans": "",
      "text": "Refills",
      "x1": 538,
      "x2": 587,
      "y1": 507,
      "y2": 519
    }
  ]

doctorInfo = {"doctorName": "Dr. Stirling"}
pharmacyInfo = {"pharmacyName": "Ri Hong"}
patientInfo = {"patientName": "Akshay Satish"}

def construct_prompt(text, doctorInfo, pharmacyInfo, patientInfo):
    prompt = f"Based on the following information; {doctorInfo}, {pharmacyInfo}, {patientInfo}, what is the best answer for {text}"
    return prompt

def generate_answers():
    API_KEY = os.getenv('OPENAI_API_KEY')
    client = OpenAI(api_key=API_KEY)

    for item in text:
        prompt = construct_prompt(item["text"], doctorInfo, pharmacyInfo, patientInfo)
        response = client.chat.completions.create(model="gpt-3.5-turbo-1106", messages=[{"role": "user", "content": prompt}], max_tokens=25)
        item['ans'] = response.choices[0].message.content
    return text

generate_answers()
print(text)
