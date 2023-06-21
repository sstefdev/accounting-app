# Accounting App Backend ⚙️

This is the backend application for the Accounting App. It provides the API endpoints and handles the business logic and data management for the application.

## Table of Content:

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Database Configuration](#database-configuration)
- [API Documentation](#api-documentation)
- [Technologies](#technologies)
- [Testing](#testing)

## Prerequisites

Before running the application, ensure that you have the following installed:

- Node.js
- npm (Node Package Manager)
- PostgreSQL

## Getting Started

1. Clone the repository:

   ```bash
    git clone https://github.com/ddbdab0/transaction-management-fullstack-level-3_7b05c62-jjg7j6.git
   ```

2. Install dependencies:

   ```bash
    cd backend
    npm install
   ```

3. Set up the environment variables:

   - Create a .env file in the root directory.
   - Add the required environment variables as key-value pairs. Refer to the [.env.example](./.env.example) file for the list of required variables.

4. Run the application:

   - For development mode with automatic restart (using nodemon):

     ```bash
     npm run dev
     ```

   - For production mode:
     ```bash
     npm start
     ```

5. The backend server should now be running on http://localhost:8000.

## Project Structure

The project follows a typical Node.js project structure:

- `src/`: Contains the application source code
  - `controller/`: Contains the controllers for different API routes
  - `data-source/`: Contains the data source configuration and initialization
  - `entity/`: Contains the entity definitions for the database models
  - `routes/`: Contains the route definitions
  - `utils/`: Contains utility functions
  - `config.ts`: Contains the application configuration
  - `server.ts`: Entry point of the application
- `dist/`: Contains the compiled JavaScript files (generated after running the build command)

## Database Configuration

By default, the application expects a PostgreSQL database. Make sure you have a PostgreSQL server running, and update the database connection details in the .env file.

Server and database configurations can be found in [config.ts](./src/config.ts) and [data-source.ts](./src/data-source.ts) respectively.

## API Documentation

The backend exposes various API endpoints. The API documentation can be accessed at http://localhost:8000/api-docs when the server is running. The documentation provides details about the available endpoints, request/response structures, and authentication requirements.

## Technologies

The backend application uses the following technologies:

- [Node.js](https://nodejs.org/en/docs)
- [Express.js](https://expressjs.com/en/starter/installing.html)
- [PostgreSQL](https://www.postgresql.org/about/)
- [TypeORM](https://typeorm.io/)
- [Swagger](https://swagger.io/docs/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cors](https://www.npmjs.com/package/cors)
- [morgan](https://www.npmjs.com/package/morgan)

## Testing

To run the tests, use the following command:

```bash
npm run test
```
