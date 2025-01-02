<!-- Title and Logo -->
<p align="center">
  <img src="path/to/logo.png" alt="LosetheLeftovers Logo" width="200" />
</p>

# Welcome to LosetheLeftovers!

LosetheLeftOvers is a food-sharing app made for a client that I worked on with my Capstone group.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [My Role](#my-role)
- [Links](#links)

## Overview
This software is segregated into two distinct pieces: the frontend and the backend.

The frontend is a React-Native mobile app implementation using TypeScript. The backend is segregated into several microservices using Django's REST API framework to ensure scalability and a high volume of requests. This app is also secure, using JWT access tokens with refresh tokens for private endpoints. Code reusability, an easy-to-use interface, and Test Driven Development were our design philosophy.

## Features
Here is a brief overview of this app's features:
- Instant Messaging
- Profile creation
- Feed of user-posted 'ads' with Lazy Loading
- Ability to sort by location using GIS
- Password reset
- Edit/Delete profile
- Edit/Delete ads

## My Role
My role in this group project is as follows:
- Sprint planning.
- Development environment setup (Docker, Django, React-Native).
- Infrastructure design (microservices segregation, database integration, reusable front-end components).
- Secure JWT + Refresh Token authentication: made an asynchronous library to automatically authenticate, securely hash and store, and refresh JWT tokens anytime the user requests a private endpoint.
- UI Design with 5 iterations of user-feedback.
- Location services using PostGIS and Long/Latitude coordinates to filter ads nearby. Ensured secure HTTP request.
- Password reset functionality using email.
- Several hours of bug fixing, tinkering, and helping group members when and where I could.

## Links
- [Frontend](link-to-frontend)
- [Backend](link-to-backend)
- [Figma](link-to-figma)
