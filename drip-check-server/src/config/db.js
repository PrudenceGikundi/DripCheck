import mongoose from "mongoose";

const connectDB = async () => {
    try {
        
        const dbURI = process.env.MONGO_URI || "mongodb://localhost:27017/prudenceHackathon"; // Replace na database  name ya kwako
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB Connected");
    } catch (error) {
        console.error(" MongoDB Connection Error:", error);
        process.exit(1); 
    }
};

export default connectDB;
