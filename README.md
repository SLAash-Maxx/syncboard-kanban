# SyncBoard - CollabBoard Full-Stack Application

A progressively built Kanban task board, developed across five sessions
per the group project brief.

## Progress so far

- **Session 1 (M1 - Static Front-End Skeleton):** React app scaffolded
  with Board/Column/TaskCard UI, mock data, localStorage persistence.
- **Session 2 (M2 - Working REST API):** Express CRUD API with JWT auth,
  front end wired to real endpoints. **You are here.**

## Structure

```
syncboard-client/   React + Vite front end
syncboard-server/   Express REST API (Node.js)
API_CONTRACT.md     Endpoint-by-endpoint request/response reference
```

## Running it locally

**Server** (start this first):
```bash
cd syncboard-server
cp .env.example .env
npm install
npm run dev
```
Runs on `http://localhost:5000`.

**Client**:
```bash
cd syncboard-client
cp .env.example .env
npm install
npm run dev
```
Runs on `http://localhost:5173`. Register an account, then log in - the
board now talks to the real API instead of only local mock data.

## Tech stack

- Front end: React 19, Vite, react-router-dom
- Back end: Node.js, Express, JWT (jsonwebtoken), bcryptjs
- Persistence: in-memory for now (Mongoose/MongoDB arrives Session 3)
- Testing/CI: not yet added (Session 4)
- Real-time/Docker/deployment: not yet added (Session 5)

## Known limitations (M2)

- Data resets on server restart - no database yet.
- Single shared task list - no multi-board support yet.
- No automated tests or CI pipeline yet.
- No real-time sync between clients yet (each client re-fetches on load
  only).
- Conflict detection on task edits is basic (HTTP 409 + "here's the
  current version") rather than live-pushed.

See `API_CONTRACT.md` for the full endpoint reference.
