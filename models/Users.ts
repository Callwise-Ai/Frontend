import mongoose from 'mongoose';

// Interface defining the user schema
export interface IUser extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    user_id: string;
    api_key: string; // This will be a random 24-character string
}

// Helper function to generate a random 24-character alphanumeric string
const generateRandomString = (length: number): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

// Mongoose schema for the User model
const UserSchema = new mongoose.Schema<IUser>({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    api_key: {
        type: String,
        required: true,
        default: () => generateRandomString(24)  // Generate a random 24-digit string for api_key
    }
}, {
    timestamps: false
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
