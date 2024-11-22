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
    user_id: String,
    api_key: String,
    available_models: [String],
    selected_model: String,
    context: String
}, {
    timestamps: false
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);