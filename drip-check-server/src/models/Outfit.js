
import mongoose from "mongoose";

const outfitSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to the User model
    image: { type: String, required: true }, // Image URL or path
    description: { type: String, required: true }, // Outfit description
    likes: { type: Number, default: 0 }, // Like count for the outfit
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }], // Store multiple ratings from users
    averageRating: { type: Number, default: 0 }, // Store the average rating for the outfit
}, { timestamps: true });

const Outfit = mongoose.model("Outfit", outfitSchema);



export default Outfit