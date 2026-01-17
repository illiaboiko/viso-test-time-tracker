# Mini Time Tracker

Viso Academy Test Task - simple project time tracker

---

## Tech Stack

- **Frontend:** React + TypeScript + MUI + notistack  
- **Backend:** Express + TypeScript  
- **Database:** SQLite + Prisma  
- **API:** REST  

---

## Project Structure

```
backend/       # Express backend + Prisma
frontend/      # React frontend
```
---

## Setup Instructions
Run frontend and backend in separate terminals. This project requires **Node.js v20.19** (tested version). 

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npx prisma generate        # generate Prisma client
npx prisma migrate dev     # create SQLite database and tables
npm run dev                # start backend on http://localhost:3001
```

> Note: The database file (`dev.db`) will be created automatically in `backend/`.  

### 2. Frontend

```bash
cd frontend
npm install
npm run dev                # start frontend on http://localhost:5173
```
## Usage

1. Open the frontend in your browser.  
2. Fill in the **time entry form**: select a project, enter hours, and add a description.  
3. Submit the form — a success notification will appear.  
4. View your entries grouped by date in the **entry history table**.  
5. The table shows **daily totals** and a **grand total**.  

---
