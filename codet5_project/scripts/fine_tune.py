import os
import json
from transformers import T5ForConditionalGeneration, T5Tokenizer
from transformers import Seq2SeqTrainer, Seq2SeqTrainingArguments
from transformers import RobertaTokenizer
from datasets import Dataset, DatasetDict

# Paths for data
train_path = "../data/train.json"  # Adjusted for codet5_project structure
valid_path = "../data/valid.json"



# Load dataset
def load_dataset(train_path, valid_path):
    with open(train_path, "r") as f:
        train_data = json.load(f)
    with open(valid_path, "r") as f:
        valid_data = json.load(f)

    # Convert JSON to Hugging Face Dataset
    train_dataset = Dataset.from_list(train_data)
    valid_dataset = Dataset.from_list(valid_data)
    return DatasetDict({"train": train_dataset, "validation": valid_dataset})

# Tokenize dataset
def preprocess_function(examples, tokenizer):
    inputs = tokenizer(examples["input"], max_length=512, truncation=True, padding="max_length")
    outputs = tokenizer(examples["output"], max_length=512, truncation=True, padding="max_length")
    inputs["labels"] = outputs["input_ids"]
    return inputs

# Model and tokenizer
model_name = "Salesforce/CodeT5-base"
tokenizer = RobertaTokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

# Load and tokenize dataset
dataset = load_dataset(train_path, valid_path)
tokenized_dataset = dataset.map(lambda x: preprocess_function(x, tokenizer), batched=True)

# Training arguments
training_args = Seq2SeqTrainingArguments(
    output_dir="../outputs/models",
    evaluation_strategy="epoch",
    learning_rate=5e-5,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    num_train_epochs=3,
    save_total_limit=2,
    save_strategy="epoch",
    logging_dir="../outputs/logs",
    predict_with_generate=True
)

# Trainer setup
trainer = Seq2SeqTrainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset["train"],
    eval_dataset=tokenized_dataset["validation"],
    tokenizer=tokenizer
)

# Start fine-tuning
trainer.train()
