import { Schema, model, models } from 'mongoose';
const productTypeSchema = new Schema({ name: { type: String, unique: true, required: true }, isActive: { type: Boolean, default: true } }, { timestamps: true });
export default models.ProductType || model('ProductType', productTypeSchema);
