import { Schema, model, models } from 'mongoose';
const roomSchema = new Schema({ name: { type: String, unique: true, required: true }, isActive: { type: Boolean, default: true } }, { timestamps: true });
export default models.Room || model('Room', roomSchema);
