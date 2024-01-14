from flask import Flask, Blueprint, request, jsonify, session
from flask_session import Session
import openai

text = [{"text": "sampleTxt", 'x': 0, 'y': 0, "ans": "abc"}, {"text": "sampleTxt", 'x': 0, 'y': 0, "ans": "abc"}]

doctorInfo = {}
pharmacyInfo = {}
patientInfo = {}

def construct_prompt(text, doctorInfo, pharmacyInfo, patientInfo):
    prompt = f"Based on the following information; {doctorInfo}, {pharmacyInfo}, {patientInfo}, what is the best answer for {text}"
    return prompt

def generate_answers():
    for item in text:
        prompt = construct_prompt(item['text'], doctorInfo, pharmacyInfo, patientInfo)
        response = openai.Completion.create(engine="davinci", prompt=prompt, max_tokens=50)
        item['ans'] = response.choices[0].text.strip()
    return text