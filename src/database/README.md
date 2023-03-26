Create .env and add the following keys
PORT = 
HOST = 
DB_USERNAME = 
DB_NAME = 
DB_PASSWORD = 
DB_PORT = 
DIARECT = 

Installing Sequerize with this command `npm install --save sequelize`

install this package `npm install --save pg pg-hstore`

install the Sequelize CLI for migrations and project bootstrapping: 
`npm install --save-dev sequelize-cli`

run this command to create an empty project `npx sequelize-cli init`

Create a model called user with following attribute using this command 
`npx sequelize-cli model:generate --name user --attributes firstName:string,lastName:string,email:string, password:string, role:string`

running migration with this command: `npx sequelize-cli db:migrate`