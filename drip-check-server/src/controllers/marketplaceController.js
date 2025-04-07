/*const MarketplaceItem = require("../models/MarketplaceItem");



// Create a new item for the marketplace
exports.createItem = async (req, res) => {
    try {
        const { title, image, description, priceKsh, caption } = req.body;
        
        const newItem = new MarketplaceItem({
            title,
            image,
            description,
            priceKsh,
            caption,
            seller: req.user.id,  // Seller info from the authenticated user
        });

        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error("❌ Error creating marketplace item:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Get all marketplace items
exports.getItems = async (req, res) => {
    try {
        const items = await MarketplaceItem.find().populate("seller", "username email");
        res.status(200).json(items);
    } catch (error) {
        console.error("❌ Error fetching items:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
*/

import MarketplaceItem from "../models/MarketplaceItem.js";

// Create a new item for the marketplace
export const createItem = async (req, res) => {
    try {
        const { title, image, description, priceKsh, caption } = req.body;
        
        const newItem = new MarketplaceItem({
            title,
            image,
            description,
            priceKsh,
            caption,
            seller: req.user.id,  // Seller info from the authenticated user
        });

        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error("❌ Error creating marketplace item:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Get all marketplace items
export const getItems = async (req, res) => {
    try {
        const items = await MarketplaceItem.find().populate("seller", "username email");
        res.status(200).json(items);
    } catch (error) {
        console.error("❌ Error fetching items:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
