import express from "express"
import morgan from "morgan"
import mongoose from 'mongoose'
import 'dotenv/config'
import routes from "./routers/index.js";
import {isAuth} from "./middlewares/authProtected.js";
import bodyParser from "body-parser";
import './system/security/passport.js'
import fileUpload from "express-fileupload"

const  app = express();
app.use(fileUpload(
    {
        useTempFiles: true
    }
));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"))
const port = process.env.PORT || 5000;
const mode = process.env.NODE_ENV || "development";

try {
    if(mode==='development'){
        mongoose.connect(process.env.DB_URL).then(() => {
            console.log("dev database connection established")
        }).catch(error => {
            console.log(error)
        })
    }
    if(mode === 'production'){
        mongoose.connect(process.env.DB_URL).then(() => {
            console.log("production database connection established")
        }).catch(error => {
            console.log(error)
        })

    }
    app.use(isAuth)
    app.use("/api/v1/", routes);
    app.use("*", (req, res) => {
        res.status(404).json({error: "resource not found"})
    })
    app.listen(port, () => {
        console.log(`The server is running on port ${port}`)
    })
}catch (e) {
    console.log(e)
}
