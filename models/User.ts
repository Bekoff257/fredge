import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  firebaseUid: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  role: { type: String, enum: ['admin', 'staff'], default: 'staff' },
  status: { type: String, enum: ['active', 'disabled'], default: 'active' }
}, { timestamps: true });

export const User = models.User || model('User', userSchema);
