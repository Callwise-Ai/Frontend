import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb'; // Ensure you have a MongoDB connection utility
import mongoose from 'mongoose';
import User from '@/models/Users'; // Adjust the import based on your folder structure

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
    try {
        // Await the params to destructure the userId
        const { userId } = params;

        // Ensure database connection
        await connectDB();

        // Verify connection
        if (mongoose.connection.readyState !== 1) {
            throw new Error('Database connection failed');
        }

        // Find user by user_id
        const user = await User.findOne({ user_id: userId }).exec();

        // Handle cases where no user is found
        if (!user) {
            return NextResponse.json(
                { message: 'User  not found' },
                { status: 404 }
            );
        }

        // Return user data
        return NextResponse.json(user);
    } catch (error) {
        // Handle any errors during fetch
        console.error('Error fetching user:', error);
        return NextResponse.json(
            { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}