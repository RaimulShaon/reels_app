import mongoose from "mongoose";


  const uri = process.env.MONGODB_URI!;

  if (!uri) {
    throw new Error("MONGODB_URI is not set");
    }
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conct: null, promise: null };
}

export async function connectToDatabase() {
    if (cached.conct) {
        return cached.conct;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            bufferMaxEntries: 10,
        };
        cached.promise = mongoose.connect(uri, opts).then(() => mongoose.connection)
    }
   try {
        cached.conct = await cached.promise;

   } catch (error) {
       console.error("Error connecting to database", error)
   }
   return cached.conct;
}