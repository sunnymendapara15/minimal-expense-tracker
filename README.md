# Minimal Expense Tracker

A clean, mobile-friendly personal expense tracker with a React single-page UI and a lightweight FastAPI backend. Expenses are stored in the browser using `localStorage`, with summary cards, filtering, and responsive styles.

## Features

- Add expenses with amount, category, date, and description.
- See every expense listed with a quick total spending summary.
- Filter by category and date range to focus on specific periods.
- Persistent data through `localStorage` so entries survive refreshes.
- Minimal modern design that works on desktop and mobile.

## Tech Stack

- **Frontend:** React (Create React App) with hooks, CSS for layout, and localStorage syncing.
- **Backend:** FastAPI serving health checks and (optionally) React static assets for production.

## Getting Started

### Frontend

1. `cd frontend`
2. `npm install`
3. `npm start` to run the development server on `http://localhost:3000`

To create a production build: `npm run build`.

### Backend

1. `cd backend`
2. `python -m pip install -r requirements.txt`
3. `uvicorn app.main:app --reload` to start the API at `http://localhost:8000`

The backend currently exposes a `/api/health` endpoint and can serve the React build from `frontend/build` when it exists.

## Deployment

1. Run `npm run build` inside `frontend/`.
2. Point a production FastAPI server to the generated `frontend/build` directory or serve the static files via another CDN.
3. Start the FastAPI app with `uvicorn` and optionally configure a reverse proxy to expose both frontend and backend under the same domain.
