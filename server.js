const express = require('express');
const { sequelize } = require('./src/database/models');

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome to ecommerce-app-cogito-bn </h1>');
});

// Connect Postgres db
app.listen({ port: 4000 }, async () => {
  console.log('Server up on http://localhost:4000');
  await sequelize.authenticate();
  console.log('Database Connected!');
});
