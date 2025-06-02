# YouTube Video Search API

A full-stack application for searching YouTube videos, tracking search history, analytics, and viewing video details.

---

## Backend (NestJS, GraphQL, CQRS, MikroORM)

### Features

- **Search YouTube Videos:** GraphQL query with pagination.
- **Search History:** Stores each search query with a timestamp in PostgreSQL.
- **Analytics:** Shows popular search queries and their counts.
- **Video Details:** Fetches detailed metadata for a specific video.
- **CQRS Pattern:** All business logic is handled via CQRS handlers.

---

### Getting Started

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/video-search-api.git
cd video-search-api
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Create a `.env` file in the root

```env
DATABASE_URL=postgres://<user>:<password>@<host>:<port>/<database>
YOUTUBE_API_KEY=your_youtube_api_key
PORT=3000
```

- You can get a YouTube API key from the [Google Cloud Console](https://console.cloud.google.com/).
- Example for Aiven/Postgres:
  ```
  DATABASE_URL=postgres://avnadmin:password@pg-xxxx.aivencloud.com:23900/defaultdb?sslmode=require
  ```

#### 4. Run database migrations

```bash
npx mikro-orm migration:up
```

#### 5. Start the backend

```bash
npm run start:dev
```

#### 6. Open GraphQL Playground

Visit [http://localhost:3000/graphql](http://localhost:3000/graphql) to test queries and mutations.

---

### Example GraphQL Queries

#### Search Videos

```graphql
query {
  searchVideos(q: "NestJS tutorial") {
    results {
      videoId
      title
      description
      thumbnailUrl
      publishedAt
    }
    totalResults
    nextPageToken
    prevPageToken
  }
}
```

#### Search History

```graphql
query {
  searchHistory {
    history {
      query
      timestamp
    }
  }
}
```

#### Analytics

```graphql
query {
  searchAnalytics {
    analytics {
      query
      count
    }
  }
}
```

#### Video Details

```graphql
query {
  videoDetails(videoId: "dQw4w9WgXcQ") {
    videoId
    title
    description
    thumbnailUrl
    publishedAt
    viewCount
    likeCount
    commentCount
  }
}
```

---

## Frontend

- See `/frontend` folder for the React app (instructions in that folder).

---

## Deployment

- You can deploy the backend to any cloud provider (Heroku, AWS, etc.).
- Make sure to set the environment variables in your deployment environment.

---
