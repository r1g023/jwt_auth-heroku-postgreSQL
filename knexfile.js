/*
  PORT=5000
  NODE_ENV=development
  DEV_DATABASE_URL='postgresql://postgres:password@localhost:5432/database_name'
  TESTING_DATABASE_URL='postgresql://postgres:password@localhost:5432/testing_database_name'
  Put the above in your .env file. Some adjustments in the connection URLs will be needed:
    - 5432 (this is the default TCP port for PostgreSQL, should work as is and can be omitted)
    - postgres (in postgres:password, this is the default superadmin user, might work as is)
    - password (in postgres:password, replace with the actual password of the postgres user)
    - database_name (use the real name of the development database you created in pgAdmin 4)
    - testing_database_name (use the real name of the testing database you created in pgAdmin 4)
*/
require("dotenv").config();
const pg = require("pg");

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false };
}

const sharedConfig = {
  client: "pg",
  migrations: { directory: "./database/migrations" },
  seeds: { directory: "./database/migrations" },
};

module.exports = {
  development: {
    ...sharedConfig,
    // useNullAsDefault: true, ---> USED FOR SQLITE ONLy
    connection: process.env.DEV_DATABASE_URL,
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
      },
    },
  },

  //testing
  testing: {
    ...sharedConfig,
    // useNullAsDefault: true, ---> USED FOR SQLITE ONLy
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
      },
    },
  },
  //heroku  pd // if deployed, this will be stored in postgres, data will persist long term vs sqlite3 which doesn't persist long enough and it resets after some time. NOT IDEAL!!!!!heroku doesn't save the data in SQLITE, so if we add a user or resource, it will dissapear after a while, it's best to use postrgress and setting pg in the production section. the enviroments will be added by heroku once deployed
  production: {
    ...sharedConfig,
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
  },
};
