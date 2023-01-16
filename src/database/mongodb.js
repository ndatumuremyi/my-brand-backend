import mongoose from "mongoose";

const mongodb = {
    connect:async () => {
        mongoose.set('strictQuery', false);
        return mongoose.connect(process.env.DB_URL || "mongodb://localhost:27017/mybrand")
    },
/*    disconnect: done => {
        mongoose.disconnect(done);
    }
    ,*/
}

export default mongodb;