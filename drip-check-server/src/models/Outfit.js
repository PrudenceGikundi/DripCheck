const mongoose = require("mongoose");

const OutfitSchema = new mongoose.Schema(
    {
        image: { type: String, required: true },
        description: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("Outfit", OutfitSchema);
