import { Pool } from "pg";
import { config } from "dotenv";
config();

export class DbConfig {
  constructor() {
    this.pool = new Pool({
      connectionString: "postgres://ghreesvk:uHyH5iojqOQ8ZoM1NX2vRK5GZvNHW0L_@tiny.db.elephantsql.com/ghreesvk",

    });
  }

  getPool() {
    return this.pool;
  }
}
