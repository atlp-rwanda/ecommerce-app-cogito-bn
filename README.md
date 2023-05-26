# ATLP E-COMMERCE PROJECT

[![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/ecommerce-app-cogito-bn/badge.svg?branch=develop)](https://coveralls.io/github/atlp-rwanda/ecommerce-app-cogito-bn?branch=develop) [![Build](https://github.com/atlp-rwanda/ecommerce-app-cogito-bn/actions/workflows/CI.yml/badge.svg)](https://github.com/atlp-rwanda/ecommerce-app-cogito-bn/actions/workflows/CI.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/71aab2013669174f9ea6/maintainability)](https://codeclimate.com/github/atlp-rwanda/ecommerce-app-cogito-bn/maintainability)

## Table of content

1. [Project description](#project-description)
2. [Using the project](#Using-the-project)
   - [Prerequisites](#Prerequisites)
   - [Installation](#Installation)
3. [Contributing](#Contributing)
4. [License](#Licence)

## Project description

In this project we developed an ecommerce app which provides a platform for buyers and sellers to meet. Each Seller will be able to register, post their products, and fully manage their stock. Buyers will be able to see all the products on the platform, add and remove products to their shopping carts, and buy from any seller where they will be able pay via the platform.

### Tech Stack

- Node.js
- Express
- Postgres DB
- Sequelize ORM

## Using the project

To use our project locally, you will need the following:

### Prerequisites

- Node.js
- A Package manager (we used npm)
- Postgres
- Git

### Installation

1. Clone the repo
2. Run `npm install` to install all package dependencies
3. Create a `.env` file and get the contents of `.env.example` file and edit them
4. To run migrations into Postgres use the following command:
   `npx sequelize-cli db:migrate`
5. To run seeders into Postgres use the following command:
   `npx sequelize-cli db:seed:all`
6. Run the project using this command `npm start`

## Contributing

To contribute to this project:

1. Clone the repo
2. Create a branch choose a naming convention depending on what you are working on:

- feature: `git checkout -b ft-name-of-the-feature-bn-TrelloCardNumber`
- bug: `git checkout -b bg-name-of-the-bug-bn-TrelloCardNumber `
- chore: `git checkout -b ft-name-of-the-chore-bn-TrelloCardNumber `

3. Commit your changes using this git command `git commit -m "commit message"`
4. Push your changes to the branch you created `git push origin branch-name`
5. Open a pull request

## Licence

Distributed under the MIT License.
