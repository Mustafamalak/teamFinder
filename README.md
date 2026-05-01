# TeamFinder

TeamFinder is a full-stack web application that helps college students find teammates for hackathons, projects, and competitions based on skills and interests.

# Features

- User authentication (JWT-based)
- Create and browse team requests
- Skill-based filtering
- Join request system
- User profiles with skills and experience

# Tech Stack

- Frontend: Next.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT

# Project Structure

/client → Frontend (Next.js)
/server → Backend (Express)

/controllers → Business logic
/models → Database schemas
/routes → API endpoints

# Setup Instructions

# 1. Clone the repository

git clone https://github.com/your-username/teamfinder.git

# 2. Install dependencies

cd server
npm install

cd ../client
npm install

# 3. Add environment variables

Create a `.env` file in the server folder:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

# 4. Run the project

Backend:
cd server
npm run dev

Frontend:
cd client
npm run dev

# Status

Currently in active development (MVP phase)

# 🎯 Goal

To simplify team formation and collaboration among college students.
