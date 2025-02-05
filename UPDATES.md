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
