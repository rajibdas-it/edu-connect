import mongoose from "mongoose"

export async function dbConnect() {
    try {
        const conn = await mongoose.connect(String(process.env.MONGODB_CONN_STRING), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000 // 10 seconds
        })
        return conn
    } catch (err) {
        console.error(err)
    }

}