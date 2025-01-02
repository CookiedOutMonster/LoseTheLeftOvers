# Welcome to LosetheLeftovers! 
![logo](https://github.com/user-attachments/assets/36742ec0-314e-4557-8ef2-20c4b7cb671b)

LosetheLeftOvers is a food-sharing app made for a client that I worked on with my Capstone group. 

## Table of Contents 
- [Frontend](/app/LooseTheLeftovers_Frontend)
- [Backend](/app/LooseTheLeftovers_Backend)
- [Figma](https://www.figma.com/design/whYFobU3nE3WhZFY9h3O93/Year-long-project-21?node-id=219-2&t=KPhOWfEH91B7qhIC-1)

## Brief Overview: 

This software is segragated into two distinct pieces, the frontend and the backend.

The frontend is a React-Native mobile app implementation using TypeScript. The backend is segragated into several microservices  using Django's REST API framework to ensure scalability and a high volume of requests. This app is also secure, using JWT access tokens with refresh tokens for private end points. Code-reusablility, an easy-to-use interface, and Test Driven Development was our design philosiphy. 

Here is a brief overview of this app's features: 
  - Instant Messaging
  - Profile creation
  - Feed of user posted 'ads' with Lazy Loading
  - Ability to sort by location using GIS
  - Password reset
  - Edit/Delete profile
  - Edit/Delete ads

## My Role

My role in this group project is as follows: 
- Sprint planning.
- Development environment setup (Docker, Django, React-Natvie).
- Infrastructure design (microservices segragation, database integration, reusable front-end components).
- Secure JWT + Refresh Token authentication: made a asynchronous library to automatically authenticate, securely hash and store, and refresh JWT tokens anytime the user requests a private endpoint.
- UI Design with 5 iterations of user-feedback.
- Location services using PostGIS and Long/Latitude cordinates to filter ads nearby. Ensured secure HTTP request.
- Password reset functionality using email.
- Several hours of bug fixing, tinkering, and helping group members when and where I could. 
