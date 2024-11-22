import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

// Define the context type for route parameters
type RouteContext = {
    params: {
        userId: string;
    };
};

export async function GET(
    request: NextRequest,
    { params }: RouteContext
) {
    try {
        // Ensure database connection
        await connectDB();

        // Verify connection
        if (mongoose.connection.readyState !== 1) {
            throw new Error('Database connection failed');
        }

        // Extract userId from context
        const { userId } = params;

        // Ensure database connection is established
        const db = mongoose.connection.db;
        if (!db) {
            throw new Error('Database is not available');
        }

        const usersCollection = db.collection('users');

        // Find user by user_id
        const user = await usersCollection.findOne({
            user_id: userId
        });

        // Handle cases where user is not found
        if (!user) {
            return NextResponse.json(
                { message: 'New user' },
                { status: 202 }
            );
        }

        // Return user data
        return NextResponse.json(user);
    } catch (error) {
        // Handle any errors during fetch
        console.error('Error fetching user:', error);
        return NextResponse.json(
            {
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}