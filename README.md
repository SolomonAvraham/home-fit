# HomeFit - Your Personalized Home Workout Companion

![HomeFit Banner]([https://your-banner-image-url.com/banner.png](https://homefit-pro.vercel.app/_next/image?url=%2Flogo%2Flogo.png&w=96&q=75))

HomeFit is a web application designed to help users create, share, and manage workout plans from the comfort of their homes. Whether you're a fitness enthusiast or a beginner, HomeFit provides a simple and efficient platform to organize your workouts and track your fitness journey.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
  - [Front-End](#front-end)
  - [Back-End](#back-end)
  - [Database](#database)
  - [Cloud Deployment](#cloud-deployment)
  - [State Management](#state-management)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
  - [Development Mode](#development-mode)
  - [Production Mode](#production-mode)
- [Testing](#testing)
- [CI/CD Pipeline](#cicd-pipeline)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Registration & Authentication:** Secure sign-up and login system with JWT-based authentication.
- **Workout Creation & Management:** Create personalized workout plans and routines.
- **Exercise Sharing:** Share exercises and workouts with other users.
- **User Profiles:** Manage personal workout data, view stats, and track progress.
- **Responsive Design:** Accessible across multiple devices including mobile, tablet, and desktop.
- **Real-Time Updates:** Receive instant updates and notifications using WebSockets.
- **Data Visualization:** Track your progress with interactive charts and graphs.
- **Secure Data Management:** User data is safely stored and managed in PostgreSQL with full CRUD support for workouts and exercises.
- **Optimized Data Fetching:** Utilize React Query for efficient data fetching and caching.

## Demo

![HomeFit Demo](https://your-demo-image-url.com/demo.gif)

Check out the live demo [here](https://homefit-pro.vercel.app).

## Tech Stack

### Front-End

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/), [DaisyUI](https://daisyui.com/)
- **State Management & Data Fetching:** [React Query](https://react-query.tanstack.com/), [Zustand](https://github.com/pmndrs/zustand)
- **UI Components:** [Material UI](https://mui.com/), [Bootstrap](https://getbootstrap.com/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)

### Back-End

- **Framework:** [Express.js](https://expressjs.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Authentication:** JWT for handling user sessions
- **ORM:** [Sequelize](https://sequelize.org/) for database interaction
- **Testing:** Vitest, [Mocha](https://mochajs.org/), and [Chai](https://www.chaijs.com/)

### Database

- **Primary DB:** [PostgreSQL](https://www.postgresql.org/)
- **Additional DB:** [MongoDB](https://www.mongodb.com/) (for specific use cases)

### Cloud Deployment

- **Front-End:** [Vercel](https://vercel.com/) (for continuous deployment and frontend hosting)
- **Back-End:** [AWS EC2](https://aws.amazon.com/ec2/) (for backend and database management)
- **CI/CD:** [GitHub Actions](https://github.com/features/actions)

### Version Control

- **Git:** [Git](https://git-scm.com/)
- **Repository Hosting:** [GitHub](https://github.com/)

## Architecture

HomeFit follows a **Monorepo** architecture, separating the front-end and back-end into distinct directories while sharing common configurations and dependencies where appropriate. The application leverages **Domain-Driven Design (DDD)** principles to ensure scalability and maintainability.

![Architecture Diagram](https://your-architecture-diagram-url.com/architecture.png)

## Getting Started

### Prerequisites

To run this project locally, ensure you have the following installed:

- **Node.js** (version >= 14.x) - [Download](https://nodejs.org/)
- **PostgreSQL** - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/downloads)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/YOUR_USERNAME/homefit.git
    ```

2. **Navigate into the project directory:**

    ```bash
    cd homefit
    ```

3. **Install the root dependencies:**

    ```bash
    npm install
    ```

4. **Navigate to the backend directory and install dependencies:**

    ```bash
    cd server
    npm install
    ```

5. **Navigate to the frontend directory and install dependencies:**

    ```bash
    cd ../client
    npm install
    ```

### Environment Variables

1. **Create a `.env` file in the `server` directory based on the `.env.example`:**

    ```bash
    cd server
    cp .env.example .env
    ```

2. **Create a `.env.local` file in the `client` directory based on the `.env.example`:**

    ```bash
    cd ../client
    cp .env.example .env.local
    ```

3. **Configure the environment variables:**

    - **Server (`server/.env`):**

        ```env
        PORT=5000
        DATABASE_URL=postgres://username:password@localhost:5432/homefit
        JWT_SECRET=your_jwt_secret
        ```

    - **Client (`client/.env.local`):**

        ```env
        NEXT_PUBLIC_API_URL=http://localhost:5000/api
        ```

### Database Setup

1. **Start PostgreSQL and create the required database:**

    ```bash
    createdb homefit
    ```

2. **Run database migrations:**

    ```bash
    cd server
    npx sequelize-cli db:migrate
    ```

## Running the Application

### Development Mode

To run both the frontend and backend servers with live-reloading enabled:

1. **Start the backend server:**

    ```bash
    cd server
    npm run dev
    ```

2. **Start the frontend server:**

    ```bash
    cd ../client
    npm run dev
    ```

The application will be accessible at `http://localhost:3000`.

### Production Mode

1. **Build the frontend:**

    ```bash
    cd client
    npm run build
    ```

2. **Start the frontend:**

    ```bash
    npm start
    ```

3. **Build and start the backend:**

    ```bash
    cd ../server
    npm run build
    npm start
    ```

## Testing

HomeFit utilizes **Mocha** and **Chai** for backend testing and **Jest** with **React Testing Library** for frontend testing.

### Running Backend Tests

```bash
cd server
npm run test
