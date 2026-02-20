import { Schema, model, models } from 'mongoose';
const settingSchema = new Schema({ key: { type: String, unique: true }, value: { type: Schema.Types.Mixed } });
export default models.Setting || model('Setting', settingSchema);
