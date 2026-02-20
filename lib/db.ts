import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error('MONGODB_URI is required');

declare global { var mongooseConn: Promise<typeof mongoose> | undefined; }

export async function dbConnect() {
  if (!global.mongooseConn) {
    global.mongooseConn = mongoose.connect(MONGODB_URI, { dbName: 'fredge' });
  }
  return global.mongooseConn;
}
