import { Schema, model, models } from 'mongoose';

const archiveSchema = new Schema(
  {
    clientId: String,
    firstName: String,
    lastName: String,
    phone: String,
    productName: String,
    productTypeName: String,
    quantityKg: Number,
    roomName: String,
    containerType: String,
    containerCount: Number,
    note: String,
    entryDate: Date,
    exitDate: Date,
    daysStored: Number,
    dailyRateSomPerKg: Number,
    totalSom: Number,
    paymentStatus: { type: String, enum: ['PAID', 'DEBT'] },
    closedBy: String,
    closedAt: Date
  },
  { timestamps: true }
);

export default models.Archive || model('Archive', archiveSchema);
