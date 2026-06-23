# College Discovery Platform API

A backend system for exploring, saving, and comparing engineering colleges. Built with Node.js, TypeScript, Express, Prisma ORM, and PostgreSQL (Neon).

**Live API:** https://internshipproject-production-975f.up.railway.app/  
**Swagger Docs:** https://internshipproject-production-975f.up.railway.app/api/docs

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework | Express.js |
| Database | PostgreSQL (Neon) via Prisma ORM |
| Auth | JWT |
| Validation | Zod |
| Logging | Winston |
| Docs | Swagger / OpenAPI |
| Deployment | Railway |

---

## Features

- **Auth** — Register, login, JWT-protected routes, current user profile
- **Colleges** — List with filtering, pagination, sorting; detailed view with courses and reviews
- **Saved Colleges** — Save, fetch, and remove colleges per user
- **Compare** — Side-by-side comparison of 2–3 colleges across fees, ratings, placement, and location

---

## Project Structure

```
src/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── controllers/
├── services/
├── repositories/
├── routes/
├── middlewares/
├── config/
├── utils/
└── server.ts
```

---

## Setup

### Prerequisites

- Node.js
- PostgreSQL connection string (Neon)

### Install & Run

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Start (production)
npm run start

# Start (development)
npm run dev
```

### Environment Variables

```env
DATABASE_URL=     # PostgreSQL connection string from Neon
JWT_SECRET=       # Secret key for token signing
PORT=3000
NODE_ENV=production
```

> In production, set these in the Railway dashboard — no `.env` file is used.

---

## API Reference

### Auth

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
```

### Colleges

```
GET    /api/colleges
GET    /api/colleges/:id
```

**Query parameters:**

| Param | Type | Description |
|---|---|---|
| `search` | string | Full-text search |
| `state` | string | Filter by state |
| `minRating` | number | Minimum rating |
| `minFees` | number | Minimum fees |
| `maxFees` | number | Maximum fees |
| `page` | number | Page number |
| `limit` | number | Results per page |
| `sortBy` | string | `rating`, `fees`, `placementRate` |
| `order` | string | `asc` or `desc` |

### Saved Colleges

```
POST   /api/saved-colleges
GET    /api/saved-colleges
DELETE /api/saved-colleges/:collegeId
```

### Compare Colleges

```
POST   /api/compare-colleges
```

```json
{
  "collegeIds": ["id1", "id2", "id3"]
}
```

Returns a structured comparison of fees, ratings, placement rate, average package, and location.

---

## Architecture

The system follows a layered MVC + Repository pattern:

```
Request → Controller → Service → Repository → Prisma → DB
                ↑
           Middleware
    (auth · validation · rate limiting · errors)
```

- **Controller** — Handles HTTP request/response
- **Service** — Business logic
- **Repository** — All database operations via Prisma
- **Middleware** — JWT auth, Zod validation, rate limiting, error handling

---

## Database Schema

```
User          — id, name, email, password
College       — id, name, location, state, fees, rating, placementRate, averagePackage, description
Course        — id, name, duration, fees, collegeId
Review        — id, rating, comment, userId, collegeId
SavedCollege  — userId + collegeId (composite key)
```

---

## Dataset

Seed-based dataset: 100 colleges, 300 courses, 500 reviews.  
Designed to demonstrate filtering, pagination, sorting, and comparison logic.
