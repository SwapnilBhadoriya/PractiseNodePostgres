const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgres://mmyzpmos:cx1Tqtl-vyxjU-VAXGDGrs9MiGE19KGS@ziggy.db.elephantsql.com/mmyzpmos",
});

const connectToDb = async () => {
  try {
    await pool.connect();
    console.log("Connected to database ...");
  } catch (error) {
    console.log("Error in connecting to database :", error);
  }
};

module.exports = { pool, connectToDb };
