import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface User {
    _id?: mongoose.Types.ObjectId;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const usrSchema = new mongoose.Schema<User>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, 
{
    timestamps: true,})

    usrSchema.pre("save", async function (next) {
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 10)
            
        }
        next(); 
    })

    export const User = mongoose.models.User || mongoose.model<User>("User", usrSchema);