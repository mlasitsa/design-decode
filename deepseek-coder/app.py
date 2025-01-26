import requests
import os
from dotenv import load_dotenv

# Load the .env file
load_dotenv()

# Get the Hugging Face API token from the environment
api_token = os.getenv("HUGGINGFACE_TOKEN")
if not api_token:
    raise ValueError("API token not found in .env file.Please add HUGGINGFACE_TOKEN.")

# Define model and API endpoint
model_name = "deepseek-ai/deepseek-coder-1.3b-base"  # Your specified model
api_url = f"https://api-inference.huggingface.co/models/{model_name}"
headers = {"Authorization": f"Bearer {api_token}"}

# Define task description and input HTML
task_description = (
    "Convert the given raw HTML into reusable React components styled with Tailwind CSS. "
    "Ensure each HTML element is mapped to a React component with meaningful class names using Tailwind utilities. "
    "The output should only contain reusable components without wrappers or page-level structure."
)
input_html = (
    '<div id="main-container" class="title">'
    '<h1 id="header" class="text-xl font-bold">Hello World</h1>'
    '<p id="description" class="text-sm text-gray-600">This is a sample HTML snippet.</p>'
    '</div>'
)

# Combine the task description and input
input_text = f"{task_description}\n{input_html}"

try:
    # Send a request to the Hugging Face API
    response = requests.post(api_url, headers=headers, json={"inputs": input_text})

    # Check and parse the response
    if response.status_code == 200:
        output = response.json()
        # Extract and clean the generated text
        if output and 'generated_text' in output[0]:
            jsx_output = output[0]['generated_text'].strip()
            print("Generated JSX Output:")
            print(jsx_output)
        else:
            print("Error: No 'generated_text' found in the response.")
    else:
        print(f"Error: {response.status_code}, {response.text}")

except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")
