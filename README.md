# YouTube Video Search Monorepo

This repository contains both the frontend and backend for the YouTube Video Search project.

## Structure

- `/frontend` — React + Vite + Apollo Client (UI)
- `/backend` — NestJS + GraphQL + MikroORM (API)

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/video-search-monorepo.git
   cd video-search-monorepo
   ```

2. **Install dependencies for each app:**

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. **Environment variables:**
   - Set up your `.env` file in `/backend` (see `/backend/README.md` for details).

### Development

- **Frontend:**

  ```bash
  cd frontend
  npm run dev
  ```

  Runs at [http://localhost:5173](http://localhost:5173)

- **Backend:**
  ```bash
  cd backend
  npm run start:dev
  ```
  Runs at [http://localhost:3000/graphql](http://localhost:3000/graphql)

### Deployment

- This repo is ready for deployment on Vercel as a monorepo.
- Set up two Vercel projects:
  - One with `frontend` as the root directory.
  - One with `backend` as the root directory.
- Set environment variables in the Vercel dashboard for each project.

---

For more details, see the `README.md` files in each subfolder.
