import express, { json, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from  "./routes.js";

dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT;

var corsOptions = {
    origin: "http://localhost:8000"
};

app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ 
    extended: true 
}));

app.use('/api', routes);

app.listen(PORT, () => {
  console.log("Running on port ", PORT);
});