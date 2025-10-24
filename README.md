⚡ Elastic Hybrid Quanta Agent

🤖 A Conversational AI Search Assistant powered by Elastic Cloud + Gemini 2.5 Pro

🔗 Live Demo: Try it on Google AI Studio


---

🧠 Overview

Elastic Hybrid Quanta Agent is a next-generation AI Search Assistant that fuses Elastic Cloud Search with Google Gemini 2.5 Pro to generate meaningful, summarized, and context-aware answers from real-world data.

It enables natural conversations with your Elastic dataset — retrieving, analyzing, and summarizing search results intelligently.


---

⚙️ Tech Stack

Component	Technology Used

🧠 AI Model	Google Gemini 2.5 Pro (Vertex AI)
🔍 Data Source	Elastic Cloud Search
💻 Backend	Python
☁️ Platform	Google AI Studio
🔐 Security	Google Secret Manager



---

✨ Features

✅ Conversational natural language search
✅ Real-time hybrid Elastic + Gemini results
✅ Context-aware summarization and insights
✅ Secure secret management
✅ Easy deployment via AI Studio or Vertex AI


---

🧩 Architecture

flowchart LR
A[User Query] --> B[Elastic Cloud Search]
B --> C[Search Results (JSON)]
C --> D[Gemini 2.5 Pro Summarizer]
D --> E[Conversational Output]


---

🔧 Setup Instructions

Step 1: Open AI Studio

1. Go to https://aistudio.google.com


2. Select Gemini 2.5 Pro model ✅


3. Click Create New Prompt




---

Step 2: Securely Add Your API Keys

Go to ⚙️ Connections → Manage Secrets and add:

ELASTIC_API_KEY → Your Elastic Cloud API Key

VERTEX_API_KEY → Your Vertex AI API Key



---

Step 3: Replace Your Elastic Endpoint

Update the Elastic Cloud URL:

ELASTIC_URL = "https://your-deployment-id.region.elastic-cloud.com:443/_search"


---

Step 4: Paste This Code

Switch to Code View (</>) in AI Studio and paste:

import os
import requests
import google.generativeai as genai

# 🔒 Load API keys from AI Studio Secrets
ELASTIC_API_KEY = os.environ.get("ELASTIC_API_KEY")
VERTEX_API_KEY = os.environ.get("VERTEX_API_KEY")

# ⚙️ Configure Gemini 2.5 Pro
genai.configure(api_key=VERTEX_API_KEY)
model = genai.GenerativeModel("gemini-2.5-pro")

# 🌐 Elastic Cloud endpoint
ELASTIC_URL = "https://your-deployment-id.region.elastic-cloud.com:443/_search"

# 🔍 Query Elastic Cloud
def elastic_search(query_text):
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"ApiKey {ELASTIC_API_KEY}"
    }
    body = {"query": {"match": {"text": query_text}}}
    response = requests.post(ELASTIC_URL, headers=headers, json=body)
    return response.json()

# 🤖 Combine Elastic results + Gemini summary
def hybrid_search_agent(user_query):
    elastic_results = elastic_search(user_query)
    context = f"Elastic search data: {elastic_results}"
    response = model.generate_content(
        f"Using this Elastic data, summarize and answer: {user_query}\n\nContext: {context}"
    )
    return response.text

# 💬 Example query
user_input = "latest AI security trends in 2025"
output = hybrid_search_agent(user_input)
print(output)


---

Step 5: Run and Test

Click Run ▶️ in AI Studio.
Try queries like:

“Show me insights about generative AI adoption.”

“Find reports related to cloud cybersecurity.”



---

🚀 Future Scope

Add a chat-based UI using Emergent.sh or Lovable.dev

Extend to multimodal (voice + image) using Gemini APIs

Connect multiple Elastic indexes for domain-specific data

Deploy as a Vertex AI Agent or Chrome extension



---

🏆 Hackathon Submission Info

💡 Inspiration

To merge Elastic’s precision with Gemini’s reasoning — enabling real-time, intelligent search for any dataset.

🛠️ What It Does

Fetches contextual data from Elastic Cloud

Summarizes intelligently using Gemini 2.5 Pro

Responds like a conversational assistant


⚔️ Challenges

Handling Elastic JSON formatting

Balancing context size for Gemini input

Managing API security


🌍 What’s Next

Integrating with web dashboards and APIs

Adding personalized conversational memory

Building domain-specific Elastic knowledge agents



---

👨‍💻 Author

Anantha Mukesh
AI & Frontend Developer | Data Analyst Enthusiast
🌐 LinkedIn • 💻 GitHub
🎯 Project: Elastic Hybrid Quanta Agent Live
