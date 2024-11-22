import mongoose from 'mongoose';

interface MongooseCache {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
}

declare global {
    var mongoose: MongooseCache;
}

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose || { conn: null, promise: null };

async function connectDB(): Promise<mongoose.Connection> {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        const opts: mongoose.ConnectOptions = {
            // Remove deprecated options
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts)
            .then(mongoose => mongoose.connection);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;