import { connectDb } from '@/lib/db';
import { Room } from '@/models/Room';
import { ProductType } from '@/models/ProductType';

async function main() {
  await connectDb();
  if (await Room.countDocuments() === 0) await Room.insertMany([{ name: '1-xona' }, { name: '2-xona' }]);
  if (await ProductType.countDocuments() === 0) await ProductType.insertMany([{ name: "Go'sht" }, { name: 'Baliq' }, { name: 'Tovuq' }]);
  console.log('Seed complete');
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
