import mongoose from 'mongoose';

interface MongooseCache {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
}

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || 'db';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

// Use a type assertion to declare a global interface
interface Global {
    mongoose?: MongooseCache;
}

// Declare global with the custom interface
declare const global: Global;

const cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

async function connectDB(): Promise<mongoose.Connection> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts: mongoose.ConnectOptions = {
            dbName: DB_NAME,
            retryWrites: true,
            w: 'majority',
            socketTimeoutMS: 45000,
            serverSelectionTimeoutMS: 30000,
            heartbeatFrequencyMS: 10000,
        };

        cached.promise = mongoose.connect(MONGODB_URI as string, opts)
            .then(mongoose => {
                console.log('✅ MongoDB Connected Successfully');
                return mongoose.connection;
            })
            .catch(error => {
                console.error('❌ MongoDB Connection Error:', error);
                throw error;
            });
    }

    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        console.error('❌ Error establishing MongoDB connection:', error);
        cached.promise = null;
        throw error;
    }
}

// Connection event listeners
const setupConnectionListeners = () => {
    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to the database');
    });

    mongoose.connection.on('error', (err) => {
        console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected');
    });
};

// Process termination handler
const setupProcessTerminationHandler = () => {
    process.on('SIGINT', async () => {
        try {
            await mongoose.connection.close();
            console.log('Mongoose connection closed through app termination');
            process.exit(0);
        } catch (error) {
            console.error('Error closing Mongoose connection:', error);
            process.exit(1);
        }
    });
};

// Initialize listeners and handlers
setupConnectionListeners();
setupProcessTerminationHandler();

export default connectDB;