## 🔴 Demo

### 🔴 🖼️ Screenshot

<a href="https://pridebnath.github.io/future-blink-assessment">
<img height="480" src="frontend/public/future-blink-assessment-by-pritam-debnath.png" />
</a>


### 🔴 🎥 Video

https://github.com/user-attachments/assets/92bee06f-802d-4be4-90b3-9d84773cc928


⬇️ <a href="frontend/public/future-blink-assessment-by-pritam-debnath.mp4" download="future-blink-assessment.mp4">
  Download Demo Video
</a>



### 🔴 ↗️ Link
https://pridebnath.github.io/future-blink-assessment


---

# 🚀 AI Flow Builder (MERN + React Flow + OpenRouter)

A full-stack MERN application that allows users to input prompts, generate AI responses, and visualize the interaction using a node-based flow interface.

---

## 📌 Overview

This project demonstrates the integration of modern frontend visualization tools with backend AI processing and database persistence.

Users can:

* Enter a prompt in a visual node
* Trigger AI processing
* View the response in a connected node
* Save the interaction to a database

---

## 🧱 Tech Stack

### Frontend

* React (Vite)
* React Flow (Node-based UI)
* TanStack Query (Async state management)
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

### AI Integration

* OpenRouter API ( 7B free model)

---

## ⚙️ Features

* 🔹 Interactive flow-based UI using React Flow
* 🔹 Real-time AI response generation
* 🔹 Loading and error state handling with TanStack Query
* 🔹 Secure backend API (no API key exposure)
* 🔹 Save prompt-response pairs to MongoDB
* 🔹 Clean modular architecture

---




---
# Set Up 
## Frontend Set Up
```
cd future-blink-assessment
``` 
```
pnpm install
``` 
```
npm run corepack:enable
``` 
```
cd frontend
``` 
```
npm run dev
``` 
## Backend Set Up
```
cd future-blink-assessment
``` 
```
pnpm install
``` 
```
npm run corepack:enable
``` 
```
cd backend
``` 
```
copy .env.example .env
```
Add your keys in .env file
```
npm run dev
```
---

#  Docs
## Backend docs
### Environment variables
```
PORT=8000

OPENROUTER_API_KEY=your-api-key

MONGO_URI=connection-string-from-db-provider
```
### MongoDB Connection String Notes
- DB name comes from `MONGO_URI` from `.env` file (not schema/model)
- No DB in URI → defaults to `test`
- Add DB: `/db-name` before `?` to set db name

