import mongoose from "mongoose";

const MarketplaceItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    priceKsh: { type: Number, required: true },
    caption: { type: String },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const MarketplaceItem = mongoose.model("MarketplaceItem", MarketplaceItemSchema);
export default MarketplaceItem;
