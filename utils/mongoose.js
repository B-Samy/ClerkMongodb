import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export const connect = async () => {
    if (mongoose.connection.readyState >= 1) {
        console.log("MongoDB already connected.");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "clerk-mongo",
        });

        console.log("MongoDB connected.");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;    
    }
};
