import requests
import os
from dotenv import load_dotenv

# Load the .env file
load_dotenv()

# Get the Hugging Face API token from the environment
api_token = os.getenv("HUGGINGFACE_TOKEN")
if not api_token:
    raise ValueError("API token not found in .env file. Please add HUGGINGFACE_TOKEN.")

# Define model and API endpoint
model_name = "Salesforce/CodeT5-base"  # Change this to the model you want to try
api_url = f"https://api-inference.huggingface.co/models/{model_name}"
headers = {"Authorization": f"Bearer {api_token}"}

# Define the task description and input HTML
task_description = (
    "Convert the given raw HTML into responsive, reusable Next.js components styled with Tailwind CSS. "
    "Ensure each HTML element is mapped to a Next.js component, with meaningful class names using Tailwind utilities. "
    "The output should be formatted as valid JSX code."
)
input_html = "<div><h1>Hello World</h1><p>This is a sample HTML snippet.</p></div>"

# Combine the task description and input
input_text = f"{task_description}\n{input_html}"

try:
    # Send a request to the Hugging Face API
    response = requests.post(api_url, headers=headers, json={"inputs": input_text})

    # Check and parse the response
    if response.status_code == 200:
        output = response.json()
        if output and 'generated_text' in output[0]:
            print("Generated Output:")
            print(output[0]['generated_text'])
        else:
            print("Error: No generated text found in the response.")
    else:
        print(f"Error: {response.status_code}, {response.text}")

except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")
