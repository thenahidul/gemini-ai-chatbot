
# Gemini AI Chat Bot

A simple chatbot project that uses the Gemini API. The setup includes a root workspace along with separate server and client packages. Bun is used for dependency installation across all directories.

## Installation

Install dependencies in the root, server, and client directories.

```bash  
# Root  
bun install  
  
# Server  
cd packages/server  
bun install  
  
# Client  
cd packages/server  
bun install  
```  

## Environment Setup

Create a `.env` file inside packages/server and add your Gemini API key.  
`GEMINI_API_KEY=your_key_here`

https://aistudio.google.com/api-keys

## Running the Project

From the root directory:  
`npm run dev`  
This starts both the server and client in development mode.

## Project Structure
```  
root/  
├── packages/  
│   ├── server/      # API server using Gemini  
│   └── client/      # Frontend chatbot interface 
└── index.ts
└── package.json
└── tsconfig.json
└── README.md  
```  


## Notes
- Make sure Bun is installed on your machine
-  The server will not run without a valid GEMINI_API_KEY
