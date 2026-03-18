# BidBoard Platform Backend

This is the Node.js/Express backend for the BidBoard Request & Offers Platform. It provides RESTful APIs for user authentication, buyer service requests, and seller competitive bidding (offers), utilizing a PostgreSQL database accessed via Prisma ORM.

## Features

- **Authentication**: JWT-based login, registration, and user profiles with hashed passwords. Role-based integrations.
- **Service Requests**: Buyers can post detailed requests containing project scopes, custom budgets, and urgency metrics.
- **Bidding/Offers**: Sellers can browse active requests and submit competitive bids (offers) containing price and estimated delivery details.
- **Validation**: Schema validation using `express-validator` to ensure data integrity.
- **Error Handling**: Centralized global error handling ensuring uniform JSON responses to the Next.js frontend.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Copy the `.env.example` file to `.env` and fill in your values safely:
   ```bash
   cp .env.example .env
   ```
   *Note: Using Neon serverless postgres requires mapping `DIRECT_URL` exclusively mapped for migration synchronizations.*

3. **Database Migration:**
   Ensure the database is synced with Prisma:
   ```bash
   npx prisma db push
   ```

4. **Start the Server:**
   ```bash
   npm run dev
   ```

## API Documentation

### Base URL: `/api`

### 1. Authentication Routes (`/api/auth`)

| Method | Endpoint        | Protection | Description                      | Body Requirements                          |
| ------ | --------------- | ---------- | -------------------------------- | ------------------------------------------ |
| POST   | `/register`     | Public     | Register a new user              | `{ name, email, password }`                |
| POST   | `/login`        | Public     | Authenticate user and get token  | `{ email, password }`                      |
| GET    | `/profile`      | Private    | Get logged-in user profile details| *Headers: `Authorization: Bearer <token>`* |
| PUT    | `/profile`      | Private    | Update the user profile info     | Optional: `{ name, email, password }`      |

> **Note**: Auth responses include the generated `token`, which should be sent as a Bearer token in the `Authorization` header for protected endpoints marked "Private".

### 2. Request Routes (`/api/requests`)

| Method | Endpoint        | Protection | Description                      | Body Requirements                          |
| ------ | --------------- | ---------- | -------------------------------- | ------------------------------------------ |
| POST   | `/`             | Private    | Create a new custom request      | `{ title, description, category, budgetRange, customBudgetMin, customBudgetMax, urgency, images? }` |
| GET    | `/`             | Public     | Fetch all public active requests | None                                       |
| GET    | `/myrequests`   | Private    | Get logged-in buyer's requests   | None                                       |
| GET    | `/:id`          | Public     | Fetch specific request by ID     | None                                       |

> **Note**: Request fetches eagerly load nested structures. `/myrequests` and `/:id` will automatically include all assigned submitted *Offers* tied to that request.

### 3. Offer (Bidding) Routes (`/api/offers`)

| Method | Endpoint              | Protection | Description                           | Body Requirements                          |
| ------ | --------------------- | ---------- | ------------------------------------- | ------------------------------------------ |
| POST   | `/`                   | Private    | Submit a new bid to a request         | `{ requestId, price, message, deliveryDays? }` |
| GET    | `/myoffers`           | Private    | Get all bids tied to logged-in seller | None                                       |
| GET    | `/request/:requestId` | Private    | Get all competing bids for a request  | None                                       |

> **Note**: A single seller user ID is restricted from posting multiple bids/offers on identical request scopes natively at the schema level (`@@unique([requestId, sellerId])`).

## Architecture Context
Built utilizing a clean route/controller/middleware file structure dynamically synchronized with Prisma driver logic. Endpoints are specifically designed to serve the Next.js `authStore` configurations seamlessly over `http://localhost:5000`.
