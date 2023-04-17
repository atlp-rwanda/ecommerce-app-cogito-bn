module.exports = {
    async up(queryInterface) {
      await queryInterface.sequelize.query(`
        ALTER TABLE products
        ALTER COLUMN quantity TYPE integer USING quantity::integer;
      `);
  
      await queryInterface.sequelize.query(`
      ALTER TABLE products
      ALTER COLUMN price TYPE float USING quantity::float;
    `);
    },
    async down(queryInterface) {
      await queryInterface.sequelize.query(`
        ALTER TABLE Products
        ALTER COLUMN quantity TYPE varchar(255);
      `);
  
      await queryInterface.sequelize.query(`
        ALTER TABLE Products
        ALTER COLUMN price TYPE varchar(255);
      `);
    },
  };