const express = require("express");
import https from "https";
import fs from "fs";
import cors from "cors";
import websocket from "./websocket";
import { Database } from "./services";
import { lastNMessages } from "./queries";

const main = async () => {
  const app = express();
  app.use(cors());
  const httpsServer = https.createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert"),
    },
    app
  );

  const db = new Database({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_NAME,
  });

  app.get(
    "/messages",
    // tslint:disable-next-line: variable-name
    async (_req: any, res: { json: (arg0: unknown) => void }) => {
      res.json(await db.query(lastNMessages({ limit: 100 })));
    }
  );

  websocket(db);

  httpsServer.listen(process.env.SERVER_PORT, () => {
    console.log(`Example app listening on port ${process.env.SERVER_PORT}!`);
  });
};

main();
