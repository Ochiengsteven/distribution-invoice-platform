# Distribr - Global Warehouse Inventory Management and P2P Trading Platform

## Table of Contents

- [Introduction](#introduction)
- [The Problem](#the-problem)
- [Our Solution](#our-solution)
- [Validation and Business Model](#validation-and-business-model)
- [Our Team](#our-team)
- [Key Benefits](#key-benefits)
- [Folder Structure](#folder-structure)
- [App Architecture](#app-architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Contributors](#contributors)
- [Support](#support)

## Introduction

Distribr is a modern alcohol distribution platform designed to streamline the process of managing inventory, orders, and deliveries for distributors, retailers, manufacturers, and delivery drivers in the alcohol industry. The application provides a comprehensive dashboard with features such as invoice management, real-time analytics, chat functionality, and a marketplace for peer-to-peer transactions.

### Key Features

- Mobile-first, multi-currency payment system
- Data-driven insights and analytics
- Low-bandwidth business tools
- Pan-African peer-to-peer marketplace
- User authentication and role-based access control
- Dashboard with real-time analytics and revenue tracking
- Invoice management system
- Chat functionality for communication between users
- Driver management and order tracking
- Responsive design for mobile and desktop use

## The Problem

### Key Issues:

1. Inefficient cross-border payment systems
   - High fees, long processing times
2. Lack of affordable digital inventory management tools
   - Manual processes, inaccuracies
3. Limited real-time market data for emerging markets
   - Missed opportunities, poor forecasting

### Impact:

- Operational inefficiencies
- Increased costs
- Reduced competitiveness

## Our Solution

### Warehouse Inventory Management and P2P Trading Platform

1. Mobile-first, multi-currency payment system
   - Payd payments.
2. Data-driven insights and analytics
   - Tailored for emerging markets
3. Low-bandwidth business tools
   - Order Management, Communication Hubs, Real-time Pricing Updates
4. Pan-African peer-to-peer marketplace
   - For excess inventory management

## Business Model

### Business Model:

1. Software Sales
   - Tiered pricing based on business size
2. Transaction Fees
   - P2P marketplace
   - Cross-border payments
3. Add-on Modules
   - Specialized features (e.g., advanced analytics)

## Key Benefits

1. 80% reduction in cross-border transaction times
2. 50% improvement in inventory accuracy
3. 35% increase in overall operational efficiency
4. 30% reduction in operational costs
5. 25% increase in profitability for SMEs

## Folder Structure

The project follows a typical Next.js folder structure with some customizations:

```
distribr/
├── public/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (main)/
│   │   ├── dashboard/
│   │   └── ...
│   ├── components/
│   │   ├── graphs/
│   │   └── ...
│   ├── lib/
│   └── utils/
├── prisma/
├── .gitignore
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
└── tailwind.config.js
```

## App Architecture

The application is built using Next.js 14 with the App Router, leveraging server-side rendering and API routes. It follows a modular architecture with the following key components:

1. **Authentication**: Implemented using Lucia for session management and bcrypt for password hashing.
2. **Database**: PostgreSQL database managed through Prisma ORM.
3. **Frontend**: React components with Tailwind CSS for styling and Ant Design for UI components.
4. **State Management**: Combination of React hooks and server actions for managing application state.
5. **API**: Server-side actions for handling data operations.
6. **Routing**: Next.js App Router for handling client-side and server-side routing.

## Tech Stack

- **Frontend**: React, Next.js 14, Tailwind CSS, Ant Design
- **Backend**: Node.js, Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Lucia, bcrypt
- **Deployment**: Vercel
- **Version Control**: Git

## Getting Started

To get the project running locally, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/your-username/distribr.git
   cd distribr
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:

   ```
   POSTGRES_PRISMA_URL=your_postgres_connection_string
   POSTGRES_URL_NON_POOLING=your_postgres_non_pooling_connection_string
   ```

4. Set up the database:

   ```
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:

   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Contributors

- [Ochieng Steven](https://github.com/Ochiengsteven)

- [Okuto Jeremy](https://github.com/JerryLegend254)

- [Korir Emanuel](https://github.com/viggenkorir)

- [Jude Kimathi](https://github.com/jxkimathi)

### UTILITIES

- [Landing page design](https://dribbble.com/shots/24196601-Delivery-Web-Design-Concept)
- [Dasboard designs](https://www.behance.net/gallery/198149127/Logistic-management-Software-App-design?tracking_source=search_projects|logistic+app+ui&l=25)
