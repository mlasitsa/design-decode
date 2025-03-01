## Updates (01/20/2025)
Most likely will be moving away from using HuggingFace for this project
**Reasons**
- HuggingFace Auto Train costs money
- Wasnt able to find good **SMALL** model for code generation that provides clear input
- Cannot manually train using Google Colab due to RAM constraints (even little model)
- Cannot download model on my computer since I dont have enough memory ( I have pretty weak laptop unfortunately )

**Proposals**
- Will try to use OpenAi API, but website DOM is huge so it will cost a lot of tokens
- To reduce tokens usage I will prompt user for which specific part of the website he wants to get jsx tailwind component
- **Issue**: custom classes -> **Solution** I will find a link tag with a ref of stylesheet and get the href, then get acess to css file and will look for tags names that are in class property (hopefully it makes sense)

## Updates (01/26/2025) 
Trying out deepseek model which is less than 10GB from huggingface so I can run if on HF server 
Deepseek little model seems working fine as of now


## Updates (02/04/2025)
Working on skippin through unnessary elements like <script> etc
Adding function to find an href of a stylesheet since I will need its data to be able to copy the design
Also might need to work on splitting sending data by chunks, since AI agent might not be able to get long input data

## Updates (02/07/2025)
I am not sure if splitting would work since huggingface deepseek model might not remember previous responses
And I think splitting the data is the only way I can handle it ?
Maybe instead of pushing towards making it for free I should consider using API calls to Claude of OpenAI
This will simplify the process, but will cost some money. Maybe stick to deepseek just API since its fairly cheap
I think I will try to use **GPT-4o** first


## Updates (02/09/2025)
Tried using GitHub Market OpenAI model that is hosted on Azure, but 
it doesnt have chat memory, figured through basic testing. 
I know I am trying to be cheap and I am paying a price for it, 
so I guess using Open Ai API is the answer
Maybe I should try deepseek since its cheaper? hehe

Approach 1:
Maybe I can try to split elements by header, nav, body, footer
for div tag I can just use stack datastucture, if its openeing then add to stack, 
if its closing then pop top one and push its elements (need to revisit this approach)
store them seperately in different variables

but then I can try to get all of this elements and parse through css and look for ids 
that I need, once its done, send this to ai componenet by componenet to process ??? 


## Updates (02/11/2025)
Currently prepping for something, didnt have that much time to work on it, 
but I am exited to be back soon! 
Stay updated! 

## Updates (02/14/2025)
Deposited 5$ to Open AI
Used file based approach and hit this error:
**429 Request too large for gpt-4o in organization org-####### on tokens per min (TPM): Limit 30000, Requested 821408. The input or output tokens must be reduced in order to run successfully.**

I wish I knew that Open AI has tiers and my tier at most can support 200.000 for lower model

Good News is that DeepSeek might not have a limit at all
Might also look into Claude or Gemini

Open AI is great but looks like all they want it moooney haha, just kidding


## Updates (02/16/2025)
Changed API to call deepseek, but ran into 402: Insuffecient funds
At the moment they ran into an issue and you cant deposit any money,
so I cant test my request. Waiting for Deepseek to restore service


## Updates (02/18/2025)
I think I came up with plan:
**Will be using function calling** [IN THE FUTURE]
**Groq API - for faster responses due to low latency** [DONE]
**LangChain - for using AI memory so I can split data in chunks** [DONE, BUT WITH SOME ISSUES]

In the **function calling** I might also use AI to revise my scraped and polished data
to verify it and polish it more if its neccassry, maybe it will get rid of empty divs or other tags

Instead of scraping everything I will give a user a choice to scrape: [DONE]
- Nav Bar
- Header
- Main Content
- Footer

Hopefully now I can finally start building and wont face any
rate or memory limits

## Updates (02/24/2025)
At the moment I have two branches:
**Main** uses Groq API
- As a downside, I am not sure if Groq supports all of the features OpenAI has through LangChain. For example, I tried to use TokenBufferMemory, but hit TPM limit since it send previous chunk with incoming and other ConversationChain did't work (Maybe I implemented it wrong)

**vector-store-db** uses Open AI API for now:
- As a downside, I might eventually hit token limit since my tier is 1, but for full production even this way might work. I want to try to play with it and see how accurate it returns small elements. As of now I dont have a feture that parses .css files content. I will need to think how can I manage it properly. 

**new-test-branch** maybe will be created for creating vector db, so I can keep other branches. I will adjust as I go

**Groq-API** will be created to still have a reference to working via Groq API (but not might a good fit), I will use Groq for making AI voice assistant in my next project


## Updates (02/25/2025)

Currently trying to build a logic to scrape neccessary css style based of classes of the elements I want to generate a resulable component for

Plan: 
- When I scrape I also have array that accepts links that reference .css stylesheets
- Also once user chose element I would need to go through this element and exctract into object in a format of:
tag:
class:
- Then I need to have another cherio scraping that would look through every .css style sheet references link and will get the styles I need
- Send everything to AI model for final processing

(But before take action I need to check if I can extract CSS files directly from browser using JS)

## Updates (02/28/2025)

App works, converst into pretty accureate component, but tested with small data like footer for now
If people will see value in it -> I will make it better an more accurate
