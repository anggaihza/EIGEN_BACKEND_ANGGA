# Library Management System

This is a simple Library Management System application that allows users to manage books and members in a library.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)

## Introduction

The Library Management System is a web application built with Node.js, Express.js, and Sequelize ORM. It allows users to perform CRUD (Create, Read, Update, Delete) operations on books and members in the library. The application uses a MySQL database to store book and member data.

## Features

- View all books available in the library.
- View the number of available books that are not currently borrowed by any member.
- View all members registered in the library.
- View the number of books borrowed by each member.
- Borrow and return books.

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm (Node Package Manager)
- MySQL database

### Installation

1. Clone the repository:
   git clone https://github.com/anggaihza/EIGEN_BACKEND_ANGGA.git
2. Navigate to the project directory.
3. Install the dependencies:
   npm install
5. Set up the database:

   - Create a new MySQL database.
   - Update the database configuration in `config/config.json` with your MySQL database credentials.

6. Run database migrations:
   npx sequelize db:migrate
   or uncomment // db.sequelize.sync({ alter: true }) at index.js

   ### Usage

To start the application, run the following command:

npm start

## API Endpoints

- GET `/books`: Get all books available in the library.
- GET `/books/available`: Shows all existing books and quantities.
- GET `/members`: Get all members registered in the library.
- GET `/members/borrowed-books-count`: Get the number of books borrowed by each member.
- POST `/borrows`: Get all members registered in the library.
  Body:
  {
    "memberId": 2,
    "bookId": 3
  }
- POST `/returns`: Get the number of books borrowed by each member.
  Body:
  {
    "memberId": 2,
    "bookId": 3
  }

## Testing

To run unit tests using Jest, use the following command:

npx jest

