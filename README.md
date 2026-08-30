# SyncBoard - Kanban Task Board

A collaborative Kanban board built progressively across a series of
development sessions, per the group project brief. Front end and
back end are developed on separate branches (`front-end`, `server`)
and merged into `main` as each milestone lands.

## Progress so far

| Milestone | Status | What it added |
|---|---|---|
| **M1 - Static Front-End Skeleton** | ✅ Done | React + Vite board UI (Column/TaskCard/FilterBar/TaskModal), mock data, localStorage persistence |
| **M2 - Working REST API** | ✅ Done | Express CRUD API, JWT auth (register/login), front end wired to real endpoints |
| **M3 - Persistence & Offline Support** | 🚧 In progress | MongoDB/Mongoose replacing in-memory data, client-side offline caching |
| **M4 - Test Suite & CI** | ⬜ Not started | Jest + Supertest (server), Jest + React Testing Library (client), CI pipeline |
| **M5 - Real-Time & Deployment** | ⬜ Not started | Socket.io live sync, Docker, deployment |

## Project structure

```
syncboard-client/   React + Vite front end
syncboard-server/   Express REST API (Node.js)
API_CONTRACT.md     Endpoint-by-endpoint request/response reference
```

## Running it locally

**1. Server** (start this first):
```bash
cd syncboard-server
cp .env.example .env    # then set MONGODB_URI - see below
npm install
npm run dev
```
Runs on `http://localhost:5000`.

**2. Client:**
```bash
cd syncboard-client
cp .env.example .env
npm install
npm run dev
```
Runs on `http://localhost:5173`. Register an account, then log in -
the board talks to the real API rather than mock data.

### Setting up MongoDB

You need a `MONGODB_URI` in `syncboard-server/.env` before the server
will start:

- **MongoDB Atlas** (recommended for the team - shared data, no local
  install): create a free cluster at
  [mongodb.com/atlas](https://www.mongodb.com/atlas), add a database
  user, allow-list your IP (or `0.0.0.0/0` for dev), and copy the
  connection string from *Connect → Drivers*.
- **Local MongoDB:** install MongoDB Community Server and use
  `mongodb://localhost:27017/syncboard`.

> Getting `querySrv ECONNREFUSED`? That's usually your network/DNS
> blocking the `mongodb+srv://` SRV lookup (common on campus Wi-Fi and
> some VPNs) - try a different network, or use Atlas's non-SRV
> connection string instead.

## Tech stack

- **Front end:** React 19, Vite, react-router-dom
- **Back end:** Node.js, Express, JWT (jsonwebtoken), bcryptjs
- **Database:** MongoDB via Mongoose
- **Testing/CI:** not yet added (M4)
- **Real-time/Docker/deployment:** not yet added (M5)

## API reference

See [`API_CONTRACT.md`](./API_CONTRACT.md) for every endpoint, request
body, and response shape, including how the API signals a conflicting
concurrent edit (`409` with the current server copy).

## Known limitations (as of M3)

- Single shared task list - no multi-board support yet.
- No automated tests or CI pipeline yet.
- No real-time sync between clients yet (each client re-fetches on
  load only; conflicting edits are caught via `409`, not pushed live).
- Docker/deployment setup not started.

## Team / branches

Work is split across two branches, three people each:

- **`front-end`** - board UI, auth pages & routing, API/data layer
- **`server`** - auth & security, task domain logic, app infra & DB

Feature branches (e.g. `database-connection`) branch off and PR back
into `front-end` or `server`, which periodically merge into `main`.
