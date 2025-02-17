import * as dotenv from "dotenv";
import pg, { Client } from "pg";
dotenv.config();

const client = new pg.Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    database: process.env.DB_NAME,
});


export default client;
