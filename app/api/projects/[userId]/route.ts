import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User, { IUser } from '@/models/Users';

export async function GET(
    request: NextRequest,
    context: { params: { userId: string } }
) {
    try {
        // Ensure database connection
        await connectDB();

        // Extract userId from context
        const { userId } = await context.params;

        // Find user by user_id
        const user: IUser | null = await User.findOne({
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
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}