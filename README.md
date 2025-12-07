# 🚗 Vehicle Rental System – Backend API

**Live URL:** https://vehical-rental-system-theta.vercel.app
**Repository URL:** https://github.com/jahedulislamdev/Vehicle-Rental-System_A2

---

### user credentials for test api

```makefile
Admin :
email: fahim@gmail.com
password: 123456

Customer:
email: kashem@gmail.com
password: 123456


```

## 🎯 Project Overview

The **Vehicle Rental System** is a backend REST API designed to manage vehicle rentals efficiently.  
It provides secure authentication, vehicle inventory management, customer handling, and booking processing.

### Core Features

#### 🚘 Vehicles

-   Add, update, and delete vehicle details
-   Track availability status
-   Manage rental price per day

#### 👤 Customers

-   Register and manage customer accounts
-   Secure login using JWT authentication

#### 📅 Bookings

-   Create new rental bookings
-   Process vehicle returns
-   Automatically calculate rental costs
-   Prevent overlapping double-bookings

#### 🔐 Authentication & Authorization

-   JWT-based secure login
-   Role-based access (Admin & Customer)
-   Admin: Can manage vehicles and all bookings
-   Customer: Can manage only their own bookings

---

## 🛠️ Technology Stack

### Backend

-   Node.js
-   TypeScript
-   Express.js

### Database

-   PostgreSQL

### Security / Utilities

-   bcrypt (password hashing)
-   jsonwebtoken (JWT authentication)
-   pg (PostgreSQL client)

---

## 🗃️ Database Tables

### Users

| Field    | Notes                       |
| -------- | --------------------------- |
| id       | Auto-generated              |
| name     | Required                    |
| email    | Required, unique, lowercase |
| password | Required, min 6 characters  |
| phone    | Required                    |
| role     | 'admin' or 'customer'       |

### Vehicles

| Field               | Notes                         |
| ------------------- | ----------------------------- |
| id                  | Auto-generated                |
| vehicle_name        | Required                      |
| type                | 'car', 'bike', 'van' or 'SUV' |
| registration_number | Required, unique              |
| daily_rent_price    | Required, positive            |
| availability_status | 'available' or 'booked'       |

### Bookings

| Field           | Notes                               |
| --------------- | ----------------------------------- |
| id              | Auto-generated                      |
| customer_id     | Links to Users table                |
| vehicle_id      | Links to Vehicles table             |
| rent_start_date | Required                            |
| rent_end_date   | Required, must be after start date  |
| total_price     | Required, positive                  |
| status          | 'active', 'cancelled' or 'returned' |

---

## ⚙️ Setup Instructions

### Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```
