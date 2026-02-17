import { Schema, model, models } from 'mongoose';
const schema = new Schema({
  firstName: String, lastName: String, phone: String, productName: String, productType: String,
  quantityKg: Number, room: String, containerType: String, containerCount: Number, entryDate: Date,
  note: String, status: { type: String, default: 'active' }
}, { timestamps: true });
schema.index({ firstName: 1, lastName: 1, phone: 1 });
export const Client = models.Client || model('Client', schema);
