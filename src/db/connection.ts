import fs from "fs";
import { Client, ClientConfig } from "pg";
import url from "url";
import dotenv from "dotenv";
import { profileEnd } from "console";
dotenv.config({ path: "../db/src/.env" });
const config: ClientConfig = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT!,
  database: process.env.DATABASE_NAME,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.CA,
  },
};

const DBConnection = new Client(config);
DBConnection.connect((err) => {
  if (err) throw err;
  DBConnection.query("SELECT VERSION()", [], (err, result) => {
    if (err) throw err;

    console.log(result.rows[0].version);
    DBConnection.end((err) => {
      if (err) throw err;
    });
  });
});

export { DBConnection };
