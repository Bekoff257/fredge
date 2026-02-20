import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    firebaseUid: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    displayName: { type: String, default: '' },
    role: { type: String, enum: ['admin', 'staff'], default: 'staff' },
    status: { type: String, enum: ['active', 'disabled'], default: 'active' }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default models.User || model('User', userSchema);
