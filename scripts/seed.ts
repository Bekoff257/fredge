import 'dotenv/config';
import { dbConnect } from '@/lib/db';
import Room from '@/models/Room';
import ProductType from '@/models/ProductType';

async function seed() {
  await dbConnect();
  for (const name of ['A-1', 'A-2', 'B-1']) await Room.updateOne({ name }, { $setOnInsert: { name, isActive: true } }, { upsert: true });
  for (const name of ['Go\'sht', 'Baliq', 'Meva']) await ProductType.updateOne({ name }, { $setOnInsert: { name, isActive: true } }, { upsert: true });
  console.log('Seed done');
  process.exit(0);
}
seed();
