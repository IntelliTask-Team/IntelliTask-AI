BACKEND

# IntelliTask AI Server

Welcome to the backend repository of IntelliTask AI, an AI-powered backend server that collaborates with our frontend to provide intelligent task breakdowns for your projects.

## 📜 Description

This repository hosts the backend API, built using Express + MongoDB.

**IMPORTANT: This repository is for the Backend (Express API) part of IntelliTask AI.** A repository with the frontend code can be found [here](https://github.com/IntelliTask-Team/IntelliTask-AI-Client).

🚀 **Demo**: A demo of the REST API can be found [here](https://intellitask-ai.netlify.app/).

## 💻 Stack

- **Express JS**: ^4.18.2
- **MongoDB**:
- **Node.js**:

## ✏ Configuration

Before launching the IntelliTask AI server, you'll need to set some environment variables. Create a `.env` file in the root directory and configure the following:

```
PORT=5005
ORIGIN=http://localhost:3000
TOKEN_SECRET=Your_Token_Secret
OPEN_AI_KEY=Your_OpenAI_API_Key
```

Replace `Your_Token_Secret` and `Your_OpenAI_API_Key` with appropriate values.

## ⚡ Usage

### Installation

Install the required dependencies for the server:

```bash
npm install
```

### Running the Server

To run the IntelliTask AI server on your local machine:

```bash
npm run dev
```

The server will begin listening on the specified PORT, defaulting to `http://localhost:5005`.

## 🔗 Related Repositories

- **Frontend**: The repository for the frontend (React) code can be found [here](https://github.com/IntelliTask-Team/IntelliTask-AI-Client).

## 🤝 Contributors

- Alexis Parsat-Lacoste
- Kim Idsinga

---

Empower your projects with IntelliTask AI Server! 🚀

---
