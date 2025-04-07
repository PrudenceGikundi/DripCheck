import Outfit from "../models/Outfit.js";

// Get all outfits
export const getAllOutfits = async (req, res) => {
  try {
    const outfits = await Outfit.find().populate("user", "username");
    res.status(200).json(outfits);
  } catch (error) {
    console.error("❌ Error fetching outfits:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Create a new outfit
export const createOutfit = async (req, res) => {
  try {
    const { image, description } = req.body;
    const outfit = new Outfit({ user: req.user.id, image, description });
    await outfit.save();
    res.status(201).json(outfit);
  } catch (error) {
    console.error("❌ Error creating outfit:", error);
    res.status(500).json({ message: "Server error", error });
  }
};