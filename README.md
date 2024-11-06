
# HomeFit

**HomeFit** is a personalized workout management platform that enables users to create, share, and manage workout plans and exercises efficiently. Designed with modern web technologies, HomeFit provides a seamless user experience for fitness enthusiasts.

---

## Features

- **User Management**: Register, login, and manage user profiles with roles.
- **Workout Plans**: Create, view, and share custom workout plans.
- **Exercise Management**: Add, edit, and organize exercises within workouts.
- **Sharing and Collaboration**: Allow users to explore and add workouts created by others.
- **Responsive Design**: Built for both desktop and mobile experiences.
- **Data Persistence**: Leveraging PostgreSQL for a robust and scalable database.
- **Secure Authentication**: Implemented with JWT and secure cookies for session management.

---

## Tech Stack

- **Frontend**: Next.js (TypeScript, React Query, Zustand for state management)
- **Backend**: Express.js (Node.js, TypeScript)
- **Database**: PostgreSQL (Sequelize ORM)
- **Hosting**: Vercel for frontend and AWS EC2 for backend
- **Testing**: Mocha, Chai, Supertest for robust testing
- **CI/CD**: GitHub Actions for automated deployment and testing
- **UI Library**: DaisyUI with TailwindCSS for styling

---

## Deployment Links

- **Live App**: [HomeFit](https://homefit-pro.vercel.app)

---

## Installation

### Prerequisites

- Node.js v20+ and npm
- PostgreSQL installed and running
- Environment variables setup (`.env` file with secrets)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/SolomonAvraham/home-fit.git
   ```

2. Navigate to the project directory:
   ```bash
   cd homefit
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up the database and environment variables.

5. Run migrations:
   ```bash
   npm run migrate
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

---

## API Documentation

The API documentation is generated using **Swagger** and can be accessed at:
`/api/` when the server is running.

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit changes (`git commit -m "Added new feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License.
