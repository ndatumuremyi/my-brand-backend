import mongoose from "mongoose";

const mongodb = {
    connect:async () => {
        const mode = process.env.NODE_ENV || "development";
        if(mode==='development'){
            mongoose.set('strictQuery', false);
            return mongoose.connect('mongodb://localhost:27017/mybrand')
            // mongoose.set("strictQuery", false);
        }
        if(mode === 'production'){
            mongoose.set('strictQuery', false);
            return mongoose.connect(process.env.DB_URL)
            // mongoose.set("strictQuery", false);
        }
    },
/*    disconnect: done => {
        mongoose.disconnect(done);
    }
    ,*/
}

export default mongodb;