# Accounting App ![accounting-app-logo](./frontend/public/favicon-32x32.png)

Accounting App is a web application built with a backend and frontend. It utilizes Docker for containerization to simplify the development and deployment process.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Docker Compose](#docker-compose)
- [Usage](#usage)

## Prerequisites

Before getting started, ensure that you have the following prerequisites installed on your machine:

_\* - for local development without Docker_

- Docker
- Node.js \*
- PostgreSQL \*

## Getting Started

To run the project locally, follow the instructions below for the backend and frontend components.

- ### Backend

  1. Navigate to the `backend` directory.

  2. Create a `.env` file with the following environment variables. You can customize these variables according to your requirements:

     ```
     PORT=8000
     DB_TYPE=your_db_type
     DB_HOST=your_db_host
     DB_PORT=your_db_port
     DB_USERNAME=your_db_username
     DB_PASSWORD=your_db_password
     DB_NAME=your_db_name
     ACCOUTS_TO_GENERATE=<accounts_to_generate>
     ```

  3. Install the required dependencies by running the following command:

     ```
     npm install
     ```

  4. Start the backend server by running the following command:

     ```
     npm start
     ```

- ### Frontend

  1. Navigate to the frontend directory.

  2. Create a .env file with the following environment variable:

     ```
     VITE_API_URL=<backend_api_url>
     ```

  3. Install the required dependencies by running the following command:

     ```
     npm install
     ```

  4. Start the frontend development server by running the following command:

     ```
     npm run dev
     ```

## [Docker](https://docs.docker.com/) Compose

The project utilizes Docker Compose to orchestrate the containers. The [docker-compose.yml](./docker-compose.yml) file defines the services and their configurations. It consists of the following services:

- `postgres`: A PostgreSQL database container.
- `backend`: The backend service container that runs the backend server.
- `frontend`: The frontend service container that runs the frontend development server.

To build and start the containers using Docker Compose, run the following command:

```
docker-compose up --build
```

## Usage

Once the containers are up and running, you can access the web application in your browser.

- Backend API: http://localhost:8000/v1/api
- Frontend Application: http://localhost:3000
