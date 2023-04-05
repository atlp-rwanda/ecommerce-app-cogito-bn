Create .env and add the following keys
PORT = 
HOST = 
DB_USERNAME = 
DB_NAME = 
DB_PASSWORD = 
DB_PORT = 
DIALECT = 

Installing Sequerize with this command `npm install --save sequelize`

install this package `npm install --save pg pg-hstore`

install the Sequelize CLI for migrations and project bootstrapping: 
`npm install --save-dev sequelize-cli`

run this command to create an empty project `npx sequelize-cli init`

Create a model called users with following attribute using this command 
`npx sequelize-cli model:generate --name users --attributes firstName:string,lastName:string,email:string, password:string, role:string`

remember to configure path on `.sequelizerc` before running migration

running migration with this command: `npx sequelize-cli db:migrate`

run this command for undoing migration: `npx sequelize-cli db:migrate:undo`

to creating dummy data for user (seed) run this command
`npx sequelize-cli seed:generate --name demo-user`

running seed  `npx sequelize-cli db:seed:all`

Undoing Seeds
Seeders can be undone if they are using any storage. There are two commands available for that:

If you wish to undo the most recent seed:

`npx sequelize-cli db:seed:undo`

If you wish to undo a specific seed:

`npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data`

If you wish to undo all seeds:

`npx sequelize-cli db:seed:undo:all`

To run server use `npm run dev`