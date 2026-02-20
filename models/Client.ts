import { Schema, model, models } from 'mongoose';

const clientSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    phone: String,
    productName: String,
    productTypeId: { type: Schema.Types.ObjectId, ref: 'ProductType' },
    quantityKg: Number,
    roomId: { type: Schema.Types.ObjectId, ref: 'Room' },
    containerType: { type: String, enum: ['YASHIK', 'QOP', 'KARZINKA'] },
    containerCount: Number,
    entryDate: Date,
    note: String,
    status: { type: String, enum: ['ACTIVE', 'CLOSED'], default: 'ACTIVE' },
    createdBy: String
  },
  { timestamps: true }
);
clientSchema.index({ firstName: 'text', lastName: 'text', phone: 'text' });

export default models.Client || model('Client', clientSchema);
