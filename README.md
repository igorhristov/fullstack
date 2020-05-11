# Collaborative API Project

Create a backend express app that provides API functionality for the Blog project, and functional frontend app that consumes the API.

Serve the application at heroku.com.

## Frontend
- Use the existing design from the Collaborative Frontend Project
- Use the API (with `fetch`, `axios`, `request`...) to fetch and manage data

## Backend
- Express app
- API routes
- Static (frontend) route
- [Optional — create admin panel — `/admin`]



## Endpoints:

### articles

- `/articles` — get lists all articles (`?page=XX` - pagination)
- `/articles` - post create new article
- `/articles/:articleId` — get article
- `/articles/:articleId` — patch update article
- `/articles/:articleId` — delete article
- `/articles/:articleId/comments` — get list all comments for the article with `articleId`

### authors

- `/authors` — get lists all authors
- `/authors` — post create new author
- `/authors/:authorId` — get author details
- `/authors/:authorId` — patch update author details
- `/authors/:authorId/articles` — get list all author articles

### tags

- `/tags` — get lists all tags
- `/tags/:slug` — get tag details
- `/tags/:slug` — post update tag details
- `/tags/:slug/articles` — get list all tags
