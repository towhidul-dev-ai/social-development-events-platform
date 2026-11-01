# GoodGather – Social Development Events Platform

GoodGather is a community-focused event platform where people can discover social development events, connect with others, and take part in activities that make a positive difference.

I built this project to make it easier for people to explore upcoming events, create their own events, and manage the activities they have joined. The platform provides a simple and responsive experience across desktop, tablet, and mobile devices.

## Live Website

🔗 **Live Demo:** https://social-frontend-three-eta.vercel.app

## Project Repositories

- **Frontend:** https://github.com/towhidul-dev-ai/social-development-events-platform
- **Backend:** https://github.com/towhidul-dev-ai/social-development-server

## Features

- **User Authentication:** Register and log in using email and password, with social login support.
- **Explore Events:** Browse upcoming social development events and view their details.
- **Create Events:** Logged-in users can create events by providing the event information.
- **Join Events:** Authenticated users can join events and keep track of their participation.
- **Manage Events:** Users can edit or delete events they have created.
- **Joined Events:** View joined events in one place, organized by event date.
- **Profile Management:** View and update profile information.
- **Protected Routes:** Private pages and API operations require authentication.
- **Responsive Design:** The interface adapts to different screen sizes.
- **Dark and Light Mode:** Switch between themes for a comfortable browsing experience.

## Technologies Used

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Better Auth
- Sonner

### Backend
- Node.js
- Express.js
- MongoDB
- Better Auth JWT verification

### Deployment
- Vercel

## Getting Started

Follow these steps to run the frontend locally.

### 1. Clone the repository

```bash
git clone https://github.com/towhidul-dev-ai/social-development-events-platform.git
```

### 2. Open the project folder

```bash
cd social-development-events-platform
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root and add the required values:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Add any additional Better Auth or authentication environment variables required by your project configuration. Keep secret values private.

### 5. Start the development server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

## Backend Setup

The backend is maintained in a separate repository.

```bash
git clone https://github.com/towhidul-dev-ai/social-development-server.git
cd social-development-server
npm install
```

Configure the required MongoDB and authentication environment variables in your backend environment file, then start the server using the script defined in `package.json`.

## Project Purpose

GoodGather was developed as a full-stack project to practice building a real-world event management application. It helped me work with frontend development, REST APIs, database operations, authentication, protected routes, and deployment.

---

**Developed with care by Towhidul Islam Shahed.**
