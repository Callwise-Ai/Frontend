import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    user_id: string;
    api_key: string;
    available_models: string[];
    selected_model: string;
    context: string;
}

const UserSchema = new mongoose.Schema<IUser>({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    api_key: {
        type: String,
        required: true
    },
    selected_model: {
        type: String,
        default: 'Meta-Llama-3.1-405B-Instruct'
    },
    available_models: {
        type: [String],
        default: [
            "Meta-Llama-3.1-405B-Instruct",
            "Meta-Llama-3.1-70B-Instruct",
            "Meta-Llama-3.1-8B-Instruct",
            "Meta-Llama-3.2-3B-Instruct"
        ]
    },
    context: {
        type: String
    }
}, {
    timestamps: false
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);