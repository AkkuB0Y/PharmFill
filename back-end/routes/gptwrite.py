from flask import Flask, Blueprint, request, jsonify, session
from flask_session import Session
from openai import OpenAI

text = [{"text": "Doctor Name", 'x': 0, 'y': 0, "ans": "abc"}, {"text": "Patient Name", 'x': 0, 'y': 0, "ans": "abc"}]

doctorInfo = {"doctorName": "Dr. Stirling"}
pharmacyInfo = {"pharmacyName": "Ri Hong"}
patientInfo = {"patientName": "Akshay Satish"}

def construct_prompt(text, doctorInfo, pharmacyInfo, patientInfo):
    prompt = f"Based on the following information; {doctorInfo}, {pharmacyInfo}, {patientInfo}, what is the best answer for {text}"
    return prompt

def generate_answers():
    client = OpenAI(api_key = "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")

    for item in text:
        prompt = construct_prompt(item['text'], doctorInfo, pharmacyInfo, patientInfo)
        response = client.chat.completions.create(model="gpt-3.5-turbo-1106", messages=[{"role": "user", "content": prompt}], max_tokens=25)
        item['ans'] = response.choices[0].message.content
    return text

generate_answers()
print(text)