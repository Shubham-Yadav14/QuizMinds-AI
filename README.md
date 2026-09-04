# QuizMind AI 🧠⚡

## 🌐 Live Demo

**[Visit QuizMind AI](https://answermyquiz.netlify.app/)**

---

### Compare AI Models. Ask Once. Get Two Perspectives.

**QuizMind AI** is a full-stack AI-powered platform that lets you send a question to **two different AI models simultaneously** and view their responses **side-by-side**.

Instead of relying on a single AI response, QuizMind AI makes it easy to compare answers from different models, evaluate their reasoning, and choose the response that best fits your needs.

---



## ✨ What is QuizMind AI?

AI models can produce different answers to the same question depending on their training, reasoning capabilities, and response generation.

QuizMind AI provides a simple interface to explore these differences.

### Ask once → Query two models → Compare responses

The platform sends the same question to two configured AI models in parallel and presents their responses next to each other.

This makes QuizMind AI useful for:

* 📚 Studying and learning
* 💻 Technical questions
* 🧠 Concept clarification
* 📝 Quiz and exam preparation
* 🔍 Comparing AI-generated answers
* ⚖️ Evaluating different AI models
* 💡 Getting multiple perspectives on a problem

---

## 🚀 Features

### 🤖 Dual-Model AI Responses

Ask a single question and receive responses from **two AI models simultaneously**.

```text
                    User Question
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
          AI Model 1            AI Model 2
              │                     │
              ▼                     ▼
         Response 1             Response 2
              │                     │
              └──────────┬──────────┘
                         ▼
                  Side-by-Side View
```

### ⚡ Parallel AI Processing

Both model requests are executed in parallel, reducing unnecessary waiting time and providing a faster comparison experience.

### 🔄 Side-by-Side Comparison

Responses are displayed next to each other, making it easy to:

* Compare explanations
* Identify differences
* Evaluate accuracy
* Compare reasoning approaches
* Choose the better response

### 🎯 Context-Aware Questions

The platform can be used for a wide range of subjects, including:

* Data Structures & Algorithms
* DBMS
* Operating Systems
* Computer Networks
* SQL
* Programming
* General Knowledge
* Academic Questions
* Technical Concepts

### 💬 Simple Chat Interface

A clean, conversational interface allows users to continuously ask questions without dealing with complex AI configuration.

### 🧩 Model Comparison

QuizMind AI is designed around **model comparison**, allowing users to understand how different AI systems approach the same problem.

---

## 🏗️ Architecture

QuizMind AI uses a modern Next.js architecture with AI model orchestration handled through API routes.

```text
┌─────────────────────────────┐
│        Next.js Client       │
│                             │
│      Chat / Question UI     │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│      Next.js API Route      │
│       /api/answerQuiz       │
│                             │
│    AI Request Orchestrator  │
└──────────────┬──────────────┘
               │
        ┌──────┴──────┐
        ▼             ▼
 ┌────────────┐ ┌────────────┐
 │  AI Model  │ │  AI Model  │
 │     #1     │ │     #2     │
 └──────┬─────┘ └──────┬─────┘
        │              │
        └──────┬───────┘
               ▼
        Combined Response
               │
               ▼
        Side-by-Side UI
```

---

## 🛠️ Tech Stack

### Frontend

* **Next.js**
* **React**
* **TypeScript**
* Modern responsive UI

### Backend

* **Next.js API Routes**
* Server-side AI orchestration
* Parallel model requests

### AI

QuizMind AI can integrate multiple AI providers/models, allowing the application to compare responses from different LLMs.

Current integrations include:

* 🤖 **Groq**
* ✨ **Google Gemini**
* 🔌 Other OpenAI-compatible models can be integrated

---

## 🔌 API Endpoints

### Answer Question

```http
POST /api/answerQuiz
```

Sends a question to the configured AI models and returns their responses for comparison.

### Health Check

```http
GET /api/health
```

Used to verify that the application and API are running correctly.

---

## ⚙️ Local Development

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd QuizMindAI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local environment file:

```bash
cp .env.example .env.local
```

Add your API credentials:

```env
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
```

> Never commit `.env.local` or expose API keys in the client-side code.

### 4. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

No separate Python/FastAPI server is required.

---

## 📁 Project Structure

```text
QuizMindAI/
│
├── app/
│   ├── api/
│   │   ├── answerQuiz/
│   │   │   └── route.ts
│   │   └── health/
│   │       └── route.ts
│   │
│   ├── components/
│   ├── page.tsx
│   └── ...
│
├── public/
│
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔐 Privacy & Data

QuizMind AI is designed to keep the application simple and lightweight.

* ❌ No user authentication
* ❌ No user database
* ❌ No persistent chat history
* ❌ No user tracking
* ✅ Stateless API architecture
* ✅ API keys remain server-side
* ✅ Questions are processed only when requested

---

## 🎯 Why QuizMind AI?

Most AI applications focus on giving users **one answer**.

QuizMind AI focuses on giving users **multiple answers to compare**.

This makes the platform particularly useful when you want to:

> **Ask less. Compare more. Decide better.**

By seeing how two AI models respond to the exact same question, users can quickly spot differences in explanations, reasoning, and conclusions.

---

## 🚧 Future Improvements

Potential improvements include:

* [ ] Support for more AI providers
* [ ] User-selectable AI models
* [ ] Custom model configuration
* [ ] Response voting
* [ ] AI response quality scoring
* [ ] Conversation history
* [ ] Markdown and code highlighting
* [ ] Response regeneration
* [ ] Export conversations
* [ ] Model performance analytics
* [ ] Streaming responses
* [ ] Custom system prompts

---

## 📌 Use Cases

| Use Case            | How QuizMind AI Helps                              |
| ------------------- | -------------------------------------------------- |
| 📚 Learning         | Compare explanations from different models         |
| 💻 Programming      | Compare different approaches to technical problems |
| 📝 Exam Preparation | Get multiple answers to academic questions         |
| 🔍 Research         | Explore different AI perspectives                  |
| 🧠 Problem Solving  | Compare reasoning approaches                       |
| ⚖️ AI Evaluation    | Observe how models answer the same prompt          |

---

## 🤝 Contributing

Contributions, ideas, and improvements are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

3. Commit your changes

```bash
git commit -m "Add your feature"
```

4. Push the branch

```bash
git push origin feature/your-feature
```

5. Open a Pull Request

---

## 📄 License

This project is available under the **MIT License**.

---

<div align="center">

### 🧠 QuizMind AI

**One Question. Two Models. Better Perspective.**

[Live Demo](https://answermyquiz.netlify.app/)

</div>
