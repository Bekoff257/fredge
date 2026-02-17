import { Schema, model, models } from 'mongoose';
const schema = new Schema({
  archiveId: String, clientId: String, fullName: String, assignedToUserId: String,
  originalAmount: Number, paidAmount: { type: Number, default: 0 }, remainingAmount: Number,
  status: { type: String, enum: ['unpaid', 'partial', 'paid'], default: 'unpaid' }, payments: [{ amount: Number, paidAt: Date }]
}, { timestamps: true });
export const Debt = models.Debt || model('Debt', schema);
