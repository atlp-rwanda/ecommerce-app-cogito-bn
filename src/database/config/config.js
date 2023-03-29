import dotenv from 'dotenv';
dotenv.config();
const config={
  
    development: {
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      dialect: "postgres"
    },
    test: {
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database:  process.env.DATABASE,
      host: process.env.DATABASE_HOST,
      dialect: "postgres"
    },
    production: {
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      host: process.env.DATABASE_HOST,
      dialect: "postgres"
    }
  
  

}


export default config;










