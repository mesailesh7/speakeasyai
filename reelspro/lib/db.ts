import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("Please define mongodb uri in env file")
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: true,// you start using your models immediately, without waiting for mongoose to establish a connection to MongoDB.
            maxPoolSize: 10 //how many connections in mongodb
        }

        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then(() => mongoose.connection)
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        throw new Error("Check database file")
    }

    return cached.conn
}