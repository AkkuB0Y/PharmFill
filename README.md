<div align="center">
    <div id="user-content-toc">
      <ul>
          <summary><h1 style="display: inline-block; margin-bottom:0px; font-size:60pt;">PharmFill</h1></summary>
      </ul>
    </div>
    <h3>Revolutionizing Prescription Management with LLMs and AI</h3>
<!--     <h4><i>xxx</i></h4> -->
</div>

Submitted to DeltaHacks X. [Submission](https://devpost.com/software/pharmfill)

The PharmFill project is a revolutionary mobile application designed to modernize and streamline the prescription filling process for patients, physicians, and pharmacists. It features real-time scanning and transcription of doctor's notes, an integrated patient database, and automated form filling using advanced OCR and AI technologies. This cross-platform solution not only enhances the accuracy of prescriptions but also simplifies the overall healthcare experience by making it more efficient and user-friendly.

## Features
- **Mobile App Interface**: User-friendly application for patients, physicians, and pharmacists.
- **Document Scanning and Transcription**: Capability to scan and transcribe written doctor's notes in real-time.
- **Editable Transcriptions**: Allows physicians to confirm, edit, or retake scans of prescriptions before dispatching to pharmacies.
- **Patient Database Integration**: Collects patient information during registration to populate a shared database, simplifying the prescription process.
- **Form Filling Automation**: Utilizes Google Cloud Vision OCR API, Gemini Pro, and OpenAI API for accurate transcription and automated form filling.
- **Data Management**: Employs a Redis Cloud database for efficient data storage and retrieval.
- **Cross-Platform Compatibility**: Built using React Native, supporting both Android and iOS devices.
- **Intuitive UI and Navigation**: Developed from early design wireframes and a high-fidelity Figma prototype, ensuring ease of use.



## How it works
- Flask backend
- React Native Frontend
- Google Cloud Platform OCR Vision API, Gemini API
- OpenAI API
- Python Pillow library


## Architecture Overview
![Architecture](https://github.com/AkkuB0Y/PharmFill/tree/main/PharmFill/assets/architecture.png)

## Form filling process:
- Read form
  - Extract text and location using Google Cloud OCR
  - Group text into coherent groups (Vertical + horizontal coordinate comparison and LLMs
  - Detect fillable fields and clean punctuation (LLM and Python)
- Answer fields (LLM)
- Write to form (Python Pillow library)

## Getting Started

### Prerequisites
1. Before you begin, ensure you have met the following requirements:
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
- [Python](https://www.python.org/) and [pip](https://pip.pypa.io/en/stable/) installed for the backend.

2. Install required dependencies in the frontend (PharmFill) folder
```
npm install
```

3. Create a `.env` file in the root directory the following variables (the first 3 require a GCP project to be setup):
```
PROJECT_ID = {Your GCP Project ID}
LOCATION = {Your GCP Project Location}
CODE_CHAT_MODEL = {Your GCP AutoML Model ID}
OPENAI_API_KEY={YOUR_API_KEY}
```

### Starting the server

_(127.0.0.1:5000 by default)_

1. `cd back-end`
2. `python3 -m venv venv`
3. `source venv/bin/activate` (MacOS)
4. `venv\Scripts\activate` (Windows Powershell)
5. `pip install -r requirements.txt`
6. `python3 app.py`

#### To Update requimrents.txt:
```python
pip freeze > requirements.txt
```

### Starting the app

_(localhost:3000 by default)_

1. `cd PharmFill`
2. `npm install`
3. `npx expo start`


## Next Steps
- [ ] Improve form filling algorithm to allow for more types of forms
- [ ] Allow patients to see the decoded prescription
