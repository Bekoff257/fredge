import { Schema, model, models } from 'mongoose';
const schema = new Schema({
  clientId: String, fullName: String, phone: String, productName: String, productType: String,
  quantityKg: Number, room: String, entryDate: Date, exitDate: Date, daysStored: Number,
  dailyRateSomPerKg: Number, total: Number, paymentType: { type: String, enum: ['cash', 'debt'] }, immutableSnapshot: Schema.Types.Mixed
}, { timestamps: true });
export const Archive = models.Archive || model('Archive', schema);
