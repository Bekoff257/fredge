import { Schema, model, models } from 'mongoose';
const schema = new Schema({
  defaultDailyRate: { type: Number, default: 1000 },
  currency: { type: String, default: "so'm" },
  phoneOtpEnabled: { type: Boolean, default: false }
}, { timestamps: true });
export const Setting = models.Setting || model('Setting', schema);
