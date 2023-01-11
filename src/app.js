import app from "./server.js";
import mongodb from "./database/mongodb.js";

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
})
try {
    mongodb.connect().then(() => {
        console.log("mongo connected successful")
    }).catch(error => {
        console.error("mongo fail to connect", error)
    })
}catch (e) {
    console.log(e)
}