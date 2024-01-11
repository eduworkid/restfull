import {Sequelize} from "sequelize";

const db = new Sequelize("edapi", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;