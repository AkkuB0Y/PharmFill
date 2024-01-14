from flask import Blueprint, jsonify

from google.cloud import vision

import os
from PIL import Image, ImageDraw


annotate = Blueprint('annotate', __name__)

# [{text: "sampleTxt", x1: 0, y1: 0, x2: 0, y2: 0, ans: "abc"}}, {text: "sampleTxt", x1: 0, y1: 0, x2: 0, y2: 0, ans: "abc"}}]

# helper functions
def detect_text_raw(path):
    """Detects text in the file."""

    client = vision.ImageAnnotatorClient()

    with open(path, "rb") as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    response = client.text_detection(image=image)
    texts = response.text_annotations

    if response.error.message:
        raise Exception(
            "{}\nFor more info on error messages, check: "
            "https://cloud.google.com/apis/design/errors".format(response.error.message)
        )

    # List to hold dictionaries of text and its bounding box
    extracted_texts = []

    for text in texts:
        if text.description.strip():  # Ensure the text is not just whitespace
            vertices = text.bounding_poly.vertices

            text_data = {
                "text": text.description,
                "x1": vertices[0].x,  # x coordinate of the top-left vertex
                "y1": vertices[0].y,  # y coordinate of the top-left vertex
                "x2": vertices[2].x,  # x coordinate of the bottom-right vertex
                "y2": vertices[2].y,  # y coordinate of the bottom-right vertex
                "ans": ""  # Empty string for 'ans'
            }
            extracted_texts.append(text_data)

    return extracted_texts

def combine_text_entries(ocr_results, line_threshold=10, proximity_threshold=60):
    combined_results = []
    current_line = []
    last_y1 = None
    last_x2 = None

    for entry in ocr_results:
        if last_y1 is not None and abs(entry["y1"] - last_y1) > line_threshold:
            # New line detected
            if current_line:
                combined_results.append(combine_line(current_line))
            current_line = [entry]
        else:
            if last_x2 is not None and (entry["x1"] - last_x2) > proximity_threshold:
                # New word, not close enough to the previous word
                if current_line:
                    combined_results.append(combine_line(current_line))
                current_line = [entry]
            else:
                # Same line and close enough to the previous word
                current_line.append(entry)

        last_y1 = entry["y1"]
        last_x2 = entry["x2"]

    if current_line:
        combined_results.append(combine_line(current_line))

    return combined_results



def combine_line(line_entries):
    # Combine the text of all entries in the line
    combined_text = ' '.join(entry['text'] for entry in line_entries)

    # Calculate the bounding box of the combined text
    x1 = min(entry['x1'] for entry in line_entries)
    y1 = min(entry['y1'] for entry in line_entries)
    x2 = max(entry['x2'] for entry in line_entries)
    y2 = max(entry['y2'] for entry in line_entries)

    return {
        'text': combined_text,
        'x1': x1,
        'y1': y1,
        'x2': x2,
        'y2': y2,
        'ans': ''
    }

def filter_unfillable(ocr_results, y_threshold=210):
    """
    Filters out OCR entries that have a y-coordinate (either y1 or y2) less than the specified threshold.

    :param ocr_results: List of OCR result entries.
    :param y_threshold: The y-coordinate threshold.
    :return: Filtered list of OCR results.
    """
    filtered_results = [entry for entry in ocr_results if entry["y1"] >= y_threshold and entry["y2"] >= y_threshold]
    return filtered_results

def clean_trailing_punctuation(ocr_results):
    """
    Removes any trailing spaces, colons, and dollar signs from the 'text' field of each OCR result entry.

    :param ocr_results: List of OCR result entries.
    :return: List of OCR results with cleaned text.
    """
    for entry in ocr_results:
        while entry["text"] and entry["text"][-1] in [" ", ":", "$", ","]:
            entry["text"] = entry["text"][:-1]

    return ocr_results

def draw_bounding_boxes(image_path, ocr_results, box_color="red", save_path="temporary_assets/output_image.png"):
    # Load the image
    with Image.open(image_path) as img:
        draw = ImageDraw.Draw(img)

        # Draw bounding boxes
        for item in ocr_results:
            # Extract the top-left and bottom-right coordinates
            x1, y1 = item["x1"], item["y1"]
            x2, y2 = item["x2"], item["y2"]

            # Draw the rectangle using the coordinates
            draw.rectangle([x1, y1, x2, y2], outline=box_color)

        # Save the image with bounding boxes
        img.save(save_path)



@annotate.route('/run', methods=['GET'])
def run():
    # Navigate one directory up from the current script's location
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    # Construct the path to the image
    image_path = os.path.join(base_dir, "temporary_assets", "prescriptionReceipt2Blank.png")
    extraction_result_raw = detect_text_raw(image_path)
    draw_bounding_boxes(image_path, extraction_result_raw, save_path="temporary_assets/extraction_raw.png")
    combined_results = combine_text_entries(extraction_result_raw)
    draw_bounding_boxes(image_path, combined_results, save_path="temporary_assets/combined_results.png")
    only_fillable_results = filter_unfillable(combined_results)
    draw_bounding_boxes(image_path, only_fillable_results, save_path="temporary_assets/only_fillable_results.png")
    punctuation_clean = clean_trailing_punctuation(only_fillable_results)
    draw_bounding_boxes(image_path, punctuation_clean, save_path="temporary_assets/punctuation_clean.png")



    return jsonify({"response": punctuation_clean}), 200
