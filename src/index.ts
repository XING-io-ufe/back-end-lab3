import * as dotenv from "dotenv";
import express, { Request, Response } from 'express';
import cors = require("cors");
import pg, { Client } from "pg";

import helmet from "helmet";
import bodyParser = require("body-parser");
import client from './database/index';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

client.connect((err) => {
    if (err) {
        console.log("error connecting to the database", err);
    } else {
        console.log("connect to the database");
    }
});

const PORT = process.env.PORT || 3000;
app.get("/", async (req: Request, res: Response) => {
    const query = `SELECT * FROM product`;
    const result = await client.query(query);
    res.json({
        success: true,
        message: "data complete",
        data: result.rows
    });

});
app.post("/post", async (req: Request, res: Response) => {
    const query = `INSERT INTO product (id, name, price) VALUES (3, 'ewdfdf', 4545);`;
    const result = await client.query(query);
    res.json({
        success: true,
        message: `ta ${req.body.id} idtai,  ${req.body.name} nertei, ${req.body.price} iim untei baraa uuslee`,
        data: result.rows
    });

});
app.delete("/delete", async (req: Request, res: Response) => {
    const query = `DELETE FROM product WHERE id = ${req.body.id}`;
    const result = await client.query(query);
    res.json({
        success: true,
        message: `tani ${req.body.id} iim dugaartai id ustlaa`,
        data: result.rows
    });

});
app.listen(PORT, async () => {
    console.log(`server runing on port ${PORT}`);
});

module.exports = app;
