# syncboard-server

Express REST API for SyncBoard - Milestone 2: Working REST API.

## Structure

```
src/
  config/        env vars, centralized
  models/        data layer (in-memory arrays for now - see note below)
  controllers/   request handling / business logic
  routes/        route definitions, wired to controllers
  middleware/    auth guard + error handling
  utils/         jwt helpers, async wrapper
server.js        entry point
```

## Run it

```bash
cp .env.example .env
npm install
npm run dev      # nodemon, restarts on file changes
# or: npm start
```

Server listens on `http://localhost:5000` by default.

## Auth

- `POST /api/auth/register` and `POST /api/auth/login` return `{ user, token }`.
- Send `Authorization: Bearer <token>` on every `/api/tasks/*` request.
- Tokens are signed with `JWT_SECRET` from `.env` - the sample value in
  `.env.example` is NOT safe to use anywhere but local dev.

## Database (Milestone 3)

`src/models/User.model.js` and `src/models/Task.model.js` are now
Mongoose schemas backed by MongoDB - data survives server restarts.
Set `MONGODB_URI` in `.env` (Atlas connection string or
`mongodb://localhost:27017/syncboard` for a local instance) before
running `npm run dev` / `npm start`; the server refuses to boot without
it (see `src/config/db.js`).

The model method names (`findAll`, `findById`, `create`, `update`,
`remove`) are unchanged from the M2 in-memory version on purpose, so
the controllers didn't need to change - only `await` was added at each
call site.

## Concurrent-edit detection

`PATCH /api/tasks/:id` accepts an optional `expectedUpdatedAt` field. If
it doesn't match the task's current `updatedAt`, the API responds `409`
with the current server copy instead of overwriting silently. See
`API_CONTRACT.md` at the repo root for the exact shape. This satisfies
the brief's "documented approach to concurrent edits" requirement at a
basic level - Milestone 5 adds Socket.io so both clients learn about the
conflict live instead of only on their next save.

## Testing

No automated tests yet - those are Milestone 4 (Test Suite & CI), which
adds Jest + Supertest here and Jest + React Testing Library on the
client.
