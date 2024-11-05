import express from "express";
import { categories } from "./src/database/db";
import router from "./src/routes/routes";
// import Db from "./src/database/db";


const port = 3000;

const app = express();

/* 
// data stores
*/

app.use(express.json());

app.get("/health", (req, res) => {
  res.send("Hello, I am up and running!");
});


app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});