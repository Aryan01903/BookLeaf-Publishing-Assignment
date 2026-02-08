# BookLeaf Author Royalty API

A RESTful API for tracking author royalties based on book sales and handling withdrawal requests — built as part of the BookLeaf publishing assignment.

## Tech Stack & Why

- **Node.js + Express** → Lightweight, fast, and perfect for building REST APIs quickly  
- **SQLite (in-memory)** → Zero setup, meets the assignment requirement (no external database server needed)  
- **CORS** → Enabled so the automated testing tool can access the API from anywhere

## Features Implemented

- Seed data with 3 authors, 6 books, and multiple sales records  
- Real-time calculation of `total_earnings` and `current_balance`  
- All required endpoints with proper validation and HTTP status codes  
- Withdrawal business rules:  
  - Minimum ₹500  
  - Cannot exceed current balance  
  - Author must exist  
- Test check endpoint: `/test`  
- Full CORS support

## API Endpoints

| Method | Endpoint                        | Description                                      |
|--------|---------------------------------|--------------------------------------------------|
| GET    | `/test`                         | Test check – confirms API is running             |
| GET    | `/authors`                      | List all authors with earnings & balance         |
| GET    | `/authors/{id}`                 | Author details + books with sales summary        |
| GET    | `/authors/{id}/sales`           | All sales for an author’s books (newest first)   |
| POST   | `/withdrawals`                  | Create withdrawal request (with validations)     |
| GET    | `/authors/{id}/withdrawals`     | List all withdrawal requests for an author       |

## Expected Starting Balances

- Priya Sharma (ID 1) → ₹3,825  
- Rahul Verma (ID 2) → ₹9,975  
- Anita Desai (ID 3) → ₹400  

## Assumptions

- `current_balance` = total earnings − sum of **all** withdrawal amounts (pending ones are also deducted)  
- Money values are returned as integers
- Dates are stored and returned as ISO strings (`YYYY-MM-DD`)  

## Deployment

Deployed on Render:  
**Live API URL:** https://author-royality.onrender.com

## Quick Local Test

```bash
npm install
node index.js