import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.GPT4API,
});

const completion = openai.chat.completions.create({
  model: "gpt-4o",
  store: true,
  messages: [
    {"role": "user", "content": "write a haiku about ai"},
  ],
});

completion.then((result) => console.log(result.choices[0].message));