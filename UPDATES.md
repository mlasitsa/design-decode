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