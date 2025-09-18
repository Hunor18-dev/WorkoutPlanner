# 🏋️ Workout Planner

A modular **Workout Manager Application** built with **microservices architecture**, allowing users to register/login, browse exercises, and create workout plans.  
This project is designed for **scalability, clean separation of concerns, and real-world enterprise practices** such as JWT authentication, CI/CD, Docker, and Kubernetes.

---

## 🚀 Features

- **Authentication Service (.NET)**
  - JWT with refresh tokens
  - User registration and login
  - User profile (name, weight, height, gender, role)
  - Unit tests

- **Exercise Service (Node.js + TypeORM)**
  - CRUD API for exercises
  - PostgreSQL database with migrations
  - Exercise entity includes name, description, difficulty, media

- **Workout Batch Service (Node.js)**
  - Manage workout plans
  - Plans contain multiple exercises
  - CRUD endpoints

- **Frontend (Next.js 15 + TypeScript)**
  - TailwindCSS styling
  - TanStack Query for fetching/caching
  - Axios for API requests
  - Pages:
    - Login
    - Register
    - Dashboard
    - Exercises
    - Workout Plans (Batches)

---

## 🏗️ Project Structure

WorkoutPlanner/
│
├── apps/
│ ├── frontend/ # Next.js frontend
│ │ └── src/app/ # pages: login, register, dashboard, workouts, batches
│ │
│ ├── auth-service/ # C# .NET Auth service
│ │ ├── Controllers/
│ │ ├── Application/
│ │ ├── Domain/
│ │ ├── Infrastructure/
│ │ └── Tests/
│ │
│ ├── exercise-service/ # Node.js + Express + TypeORM
│ │ ├── src/entities/
│ │ ├── src/routes/
│ │ └── src/migrations/
│ │
│ └── batch-service/ # Node.js + Express
│ ├── src/entities/
│ ├── src/routes/
│ └── src/migrations/
│
├── pnpm-workspace.yaml # Monorepo workspace
├── workoutplanner.sln # .NET solution file
└── README.md


---

## ⚙️ Tech Stack

- **Frontend:** Next.js 15, TypeScript, TailwindCSS, TanStack Query, Axios
- **Auth Service:** .NET 9, EF Core, PostgreSQL, JWT + Refresh Tokens, xUnit tests
- **Exercise Service:** Node.js, Express, TypeORM, PostgreSQL
- **Batch Service:** Node.js, Express, PostgreSQL
- **Infrastructure:** PostgreSQL, Docker, Kubernetes, GitHub Actions, Kafka (planned)

---

## 🛠️ Setup & Run

### 1. Clone Repo
```bash
git clone https://github.com/your-username/workout-planner.git
cd workout-planner

### 2. Frontend:
cd apps/frontend
pnpm install
pnpm dev
Runs at: http://localhost:3000

### 3. Auth Service (.NET)
cd apps/auth-service/AuthService
dotnet ef database update   # run migrations
dotnet run
Runs at: http://localhost:5000

### 4. Exercise Service (Node.js)
cd apps/exercise-service
npm install
npm run typeorm migration:run
npm run dev
Runs at: http://localhost:4000

### 5. Batch Service (Node.js)
cd apps/batch-service
npm install
npm run typeorm migration:run
npm run dev
Runs at: http://localhost:5001

## Next Steps
Add unit tests across all services
Add CI/CD pipeline with GitHub Actions
Containerize with Docker
Deploy via Kubernetes
Integrate Kafka for cross-service communication
## Final Goal
Deliver a Workout Manager Platform where users can:
Register & login securely with JWT
Manage profile details
Browse exercises
Create workout plans with sets, reps, weights, and rests
Use a polished frontend dashboard


And from a devops perspective:
Fully containerized microservices
Kubernetes deployment
CI/CD pipeline
Kafka orchestration

