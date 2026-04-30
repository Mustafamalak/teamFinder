# TeamFinder

TeamFinder is a full-stack web application that helps college students find teammates for hackathons, projects, competitions, and startup ideas through skill-based posts and structured join request workflows.

## Problem

College students often struggle to find reliable teammates for hackathons and projects. Most team formation happens through scattered WhatsApp groups, random class contacts, or last-minute messages, which makes collaboration inefficient.

## Solution

TeamFinder provides a centralized platform where students can create team posts, discover open opportunities, request to join teams, and manage incoming requests through a structured workflow.

## Features

- JWT-based authentication
- Modern responsive UI with glassmorphism and interactive card effects
- Create team posts with required skills and team size
- Dashboard to browse open team opportunities
- Keyword and skill-based filtering
- Send join requests to teams
- Accept/reject incoming requests as post owner
- Track sent request status
- Profile completion with skills, bio, and experience level
- Protected frontend routes
- Logout functionality

## Tech Stack

### Frontend
- Next.js
- JavaScript
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Backend Highlights

- Protected REST APIs using JWT middleware
- Role-based request handling
- Duplicate request prevention
- Team capacity validation
- Self-request prevention
- MongoDB relationships using references and populate
- Pagination and filtering support for posts

## Project Structure

```bash
teamFinder/
├── client/
│   ├── app/
│   ├── components/
│   └── utils/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md
