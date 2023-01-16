import express from "express"
import morgan from "morgan"
import 'dotenv/config'
import routes from "./routers/index.js";
import {isAuth} from "./middlewares/authProtected.js";
import bodyParser from "body-parser";
import './system/security/passport.js'
import fileUpload from "express-fileupload"
import cors from 'cors';

const  app = express();
app.use(fileUpload(
    {
        useTempFiles: true
    }
));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
// app.use(morgan("dev"))
app.use(isAuth)
app.use("/api/v1/", routes);
app.use("*", (req, res) => {
    res.status(404).json({error: "resource not found"})
})

export default app