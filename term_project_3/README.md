# Malama Waikiki Resort — Hawaii Hospitality Dashboard

## Project Overview

Malama Waikiki Resort is a full-stack hospitality website for a fictional 4-star resort hotel in Waikiki, Oahu. The public side of the website works as a marketing page for visitors, while the admin side includes a protected dashboard with tourism data, weather information, property records, and a special offer management feature.

This project was built for ICS 385 Term Project 3. It combines MongoDB, Express, React, Node.js, authentication, dashboard visualizations, and basic security hardening.

## Target Audience

The public marketing page is designed for couples, leisure travelers, and first-time visitors to Oahu who want a relaxing Waikiki stay near the beach, shopping, dining, and local attractions.

The admin dashboard is designed for the resort owner, manager, or trusted staff member who needs to view hospitality data and manage public-facing announcements.

## Main Features

- Public marketing page for Malama Waikiki Resort
- Hero, About, Amenities, Special Offer, and CTA sections
- Property data stored in MongoDB Atlas
- Express API routes for property data and dashboard data
- Embedded property reviews
- React dashboard with visitor statistics
- Bar chart for visitor arrivals
- Pie chart for visitor origin
- KPI cards for average daily rate, occupancy rate, and average stay
- OpenWeatherMap weather widget
- Island selector that updates dashboard data
- Admin login with Passport.js LocalStrategy
- bcrypt password hashing with 10 salt rounds
- Session management using express-session and connect-mongo
- Protected admin dashboard route
- Admin-only special offer form
- Input validation and sanitization using express-validator
- Security headers using Helmet.js
- Jest and Supertest integration tests

## Technology Stack

### Front End

- React
- Vite
- JavaScript
- CSS
- Chart.js
- react-chartjs-2
- OpenWeatherMap API

### Back End

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Passport.js
- passport-local
- bcrypt
- express-session
- connect-mongo
- express-validator
- Helmet.js
- CORS
- dotenv

### Testing

- Jest
- Supertest

## Project Structure

```text
term_project_3/
  middleware/
    isAuthenticated.js

  models/
    Offer.js
    Property.js
    User.js

  routes/
    authRoutes.js
    dashboardRoutes.js
    offerRoutes.js
    propertyRoutes.js

  src/
    components/
      About.jsx
      Amenities.jsx
      CTA.jsx
      Hero.jsx
      IslandSelector.jsx
      KPICards.jsx
      SpecialOffer.jsx
      VisitorArrivalsChart.jsx
      VisitorOriginChart.jsx
      WeatherWidget.jsx

    pages/
      AdminDashboard.jsx
      AdminLogin.jsx
      Home.jsx

    App.css
    App.jsx
    main.jsx

  tests/
    app.test.js

  docs/
    screenshots go here

  .env.example
  .gitignore
  index.html
  package.json
  passport-config.js
  seed.js
  server.js