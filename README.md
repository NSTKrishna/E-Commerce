# E-Commerce Application

A full-stack e-commerce application built with Next.js, Node.js, Express, and PostgreSQL.

## Prerequisites

- Node.js installed
- PostgreSQL installed and running

## Setup

### 1. Database Setup

Ensure your PostgreSQL database is running. Update the `DATABASE_URL` in `server/.env` if necessary.

```bash
# Default config in server/.env
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce?schema=public"
```

### 2. Backend Setup

Navigate to the `server` directory:

```bash
cd server
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm start
```

The server will run on `http://localhost:5000`.

### 3. Frontend Setup

Navigate to the `client` directory:

```bash
cd client
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`.

## Features

- **User Authentication**: Register and login (JWT).
- **Products**: Browse, search (backend ready), and view details.
- **Cart**: Add to cart, adjust quantity, remove items.
- **Checkout**: Place orders.
- **Order History**: View your past orders.
- **Admin Dashboard**: Manage products (Add/Delete) and view all orders.
  - **Admin Credentials**:
    - Email: `admin@example.com`
    - Password: `admin123`
  - **User Credentials**:
    - Email: `user@example.com`
    - Password: `user123`

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Zustand, React Query, Axios.
- **Backend**: Node.js, Express, Prisma, JWT.
- **Database**: PostgreSQL.
