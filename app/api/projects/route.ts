// import { NextRequest, NextResponse } from 'next/server';
// import connectDB from '@/lib/mongodb'; // Assuming your MongoDB connection logic is in this helper
// import mongoose from 'mongoose';
// import User from '@/models/Users'; // Assuming the User schema is located here

// export async function POST(request: NextRequest) {
//     try {
//         // Parse the incoming request body to get user_id
//         const { user_id } = await request.json();

//         // Ensure user_id is provided
//         if (!user_id) {
//             return NextResponse.json(
//                 { message: 'user_id is required' },
//                 { status: 400 }
//             );
//         }

//         // Ensure database connection
//         await connectDB();

//         // Verify connection
//         if (mongoose.connection.readyState !== 1) {
//             throw new Error('Database connection failed');
//         }

//         // Check if the user already exists
//         const existingUser = await User.findOne({ user_id });
//         if (existingUser) {
//             return NextResponse.json(
//                 { message: 'User already exists' },
//                 { status: 400 }
//             );
//         }

//         // Create a new user with a generated API key
//         const newUser = new User({
//             user_id,
//             api_key: undefined, // api_key is auto-generated using the schema default function
//         });

//         // Save the user to the database
//         await newUser.save();

//         // Return success response with the new user data (excluding sensitive fields)
//         return NextResponse.json(
//             { message: 'User created successfully', user: { user_id: newUser.user_id, api_key: newUser.api_key } },
//             { status: 201 }
//         );
//     } catch (error) {
//         // Handle any errors during user creation
//         console.error('Error creating user:', error);
//         return NextResponse.json(
//             {
//                 message: 'Internal server error',
//                 error: error instanceof Error ? error.message : 'Unknown error'
//             },
//             { status: 500 }
//         );
//     }
// }







import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import User from '@/models/Users';

export async function POST(request: NextRequest) {
    try {
        // Add request logging
        console.log('Received POST request to /api/projects');

        // Ensure request has a body
        let body;
        try {
            body = await request.json();
            console.log('Request body:', body);
        } catch (e) {
            console.error('Error parsing request body:', e);
            return NextResponse.json(
                { message: 'Invalid request body' },
                { status: 400 }
            );
        }

        const { user_id } = body;

        // Validate user_id more thoroughly
        if (!user_id || typeof user_id !== 'string' || user_id.trim() === '') {
            console.error('Invalid or missing user_id:', user_id);
            return NextResponse.json(
                { message: 'Valid user_id is required' },
                { status: 400 }
            );
        }

        console.log('Attempting database connection...');
        try {
            await connectDB();
        } catch (error) {
            console.error('Database connection error:', error);
            return NextResponse.json(
                { message: 'Database connection failed' },
                { status: 500 }
            );
        }

        // Double check database connection
        if (mongoose.connection.readyState !== 1) {
            console.error('Database not connected. Current state:', mongoose.connection.readyState);
            return NextResponse.json(
                { message: 'Database connection not ready' },
                { status: 503 }
            );
        }

        console.log('Checking for existing user...');
        const existingUser = await User.findOne({ user_id: user_id.trim() });

        if (existingUser) {
            console.log('User already exists:', user_id);
            return NextResponse.json(
                {
                    message: 'User already exists',
                    user: {
                        user_id: existingUser.user_id,
                        api_key: existingUser.api_key
                    }
                },
                { status: 200 } // Changed to 200 since finding existing user isn't an error
            );
        }

        console.log('Creating new user...');
        const newUser = new User({
            user_id: user_id.trim(),
            api_key: undefined, // Will use schema default
        });

        // Save with error handling
        try {
            await newUser.save();
            console.log('User created successfully:', user_id);
        } catch (error) {
            console.error('Error saving user:', error);
            return NextResponse.json(
                {
                    message: 'Error creating user',
                    error: error instanceof Error ? error.message : 'Unknown error'
                },
                { status: 500 }
            );
        }

        // Set CORS headers
        const headers = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        });

        return new NextResponse(
            JSON.stringify({
                message: 'User created successfully',
                user: {
                    user_id: newUser.user_id,
                    api_key: newUser.api_key
                }
            }),
            {
                status: 201,
                headers: headers
            }
        );

    } catch (error) {
        console.error('Unhandled error in POST /api/projects:', error);
        return NextResponse.json(
            {
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}