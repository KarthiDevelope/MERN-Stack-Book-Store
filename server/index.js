import express from "express";
import { PORT, mongodb } from "./config.js";
import mongoose from "mongoose";
import router from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json())

app.get('/', (request, response) => {
    return response.status(234).send("Welcome Karthikeyan to the MERN Stack")
})
app.use(cors())

app.use('/books', router)








mongoose
    .connect(mongodb)
    .then(() => {
        console.log("App is Connected to the db..");
        app.listen(PORT, () => {
            console.log(`App is Running on port: ${PORT}`);

        })
    })
    .catch((err) => {
        console.log(err)
    })