import { Schema, model, models } from 'mongoose';

const debtSchema = new Schema(
  {
    archiveId: { type: Schema.Types.ObjectId, ref: 'Archive', required: true },
    totalSom: Number,
    paidSom: { type: Number, default: 0 },
    remainingSom: Number,
    status: { type: String, enum: ['UNPAID', 'PARTIAL', 'PAID'], default: 'UNPAID' },
    payments: [
      { amountSom: Number, note: String, paidAt: Date, paidByUid: String }
    ]
  },
  { timestamps: true }
);

export default models.Debt || model('Debt', debtSchema);
