import { Schema, model, models } from 'mongoose';
const schema = new Schema({ name: { type: String, required: true, unique: true }, isActive: { type: Boolean, default: true } }, { timestamps: true });
export const Room = models.Room || model('Room', schema);
