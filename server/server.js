import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";
import playerRouter from "../server/routes/player.router.js"
import adminRouter from "../server/routes/admin.router.js"
import cors from "cors"

const app = express();

const PORT = process.env.PORT || 3500;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//using middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors())


app.get("/", (req, res) => {
  res.send("this is my home page");
});

//using player router
app.use('/players',playerRouter);
app.use('/admin',adminRouter);

// app.get("/lastId", async (req, res) => {
//   var lastid = await lastId();
//   lastid = lastid[0];
//   var lid = lastid["LAST_INSERT_ID(pid)"];
//   console.log(lid);
//   res.status(200).json({ lastID: `${lid}` });
// });

app.listen(PORT, () => {
  console.log(`server is satarted at http://localhost:${PORT}`);
});
