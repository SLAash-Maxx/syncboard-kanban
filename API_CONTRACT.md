# SyncBoard API Contract - Milestone 2

Base URL (local dev): `http://localhost:5000/api`

All request/response bodies are JSON. Protected routes require:

```
Authorization: Bearer <token>
```

---

## Auth

### POST /auth/register

Request:
```json
{ "name": "Ada Lovelace", "email": "ada@example.com", "password": "hunter22" }
```

Response `201`:
```json
{
  "user": { "id": 1, "name": "Ada Lovelace", "email": "ada@example.com", "createdAt": "..." },
  "token": "<jwt>"
}
```

Errors: `400` missing/short fields, `409` email already registered.

### POST /auth/login

Request:
```json
{ "email": "ada@example.com", "password": "hunter22" }
```

Response `200`: same shape as register.

Errors: `400` missing fields, `401` invalid credentials.

### GET /auth/me  *(protected)*

Response `200`:
```json
{ "user": { "id": 1, "name": "Ada Lovelace", "email": "ada@example.com", "createdAt": "..." } }
```

---

## Tasks

All routes below are protected (`requireAuth`) and live under `/tasks`.

### GET /tasks

Response `200`:
```json
{ "tasks": [ { "id": 1, "title": "...", "description": "...", "priority": "High", "status": "todo", "dueDateTime": "2026-08-10T10:00", "tags": ["Frontend"], "ownerId": 1, "updatedAt": "..." } ] }
```

### GET /tasks/:id

Response `200`: `{ "task": { ...same shape as above } }`
Errors: `404` not found.

### POST /tasks

Request:
```json
{ "title": "Write tests", "description": "", "priority": "Medium", "status": "todo", "dueDateTime": "2026-08-25T09:00", "tags": ["Testing"] }
```

Response `201`: `{ "task": { ...created task, including generated id, ownerId, updatedAt } }`
Errors: `400` missing title.

### PATCH /tasks/:id

Request - any subset of editable fields, plus optionally `expectedUpdatedAt`
(the `updatedAt` value the client last saw for this task):
```json
{ "status": "in-progress", "expectedUpdatedAt": "2026-08-20T10:15:00.000Z" }
```

Response `200`: `{ "task": { ...updated task } }`

**Conflict response `409`** (only when `expectedUpdatedAt` is provided and
no longer matches - i.e. someone else changed the task first):
```json
{
  "error": "This task was changed by someone else since you loaded it",
  "current": { ...the task as it currently exists on the server }
}
```
The client should surface this to the user (e.g. "someone else updated
this task - reload their version or overwrite?") rather than retry the
write automatically. This is the app's basic concurrent-edit safeguard;
Milestone 5 layers Socket.io on top so conflicts are visible the moment
they happen, not just on next save.

Errors: `404` not found.

### DELETE /tasks/:id

Response `204`, empty body.
Errors: `404` not found.

---

## Error shape (all endpoints)

```json
{ "error": "human-readable message" }
```

## Not part of this contract yet

- Boards / multi-board support (current scope is a single shared task list)
- Real-time push (Socket.io arrives Milestone 5)
- Persistent storage (MongoDB arrives Milestone 3 - until then, data
  resets whenever the server restarts)
