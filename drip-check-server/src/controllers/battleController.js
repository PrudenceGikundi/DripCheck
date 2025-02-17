const DripBattle = require("../models/DripBattle");
const MarketplaceItem = require("../models/MarketplaceItem");

// Create a battle for an outfit
exports.createBattle = async (req, res) => {
    try {
        const { outfitId } = req.body;

        // Find the outfit by ID
        const outfit = await MarketplaceItem.findById(outfitId);
        if (!outfit) return res.status(404).json({ message: "Outfit not found" });

        const newBattle = new DripBattle({
            outfit: outfitId,
        });

        await newBattle.save();
        res.status(201).json(newBattle);
    } catch (error) {
        console.error("❌ Error creating battle:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Get all battles (Drip Battle leaderboard)
exports.getBattles = async (req, res) => {
    try {
        const battles = await DripBattle.find()
            .populate("outfit")
            .sort({ likes: -1 });  // Sort by number of likes
        res.status(200).json(battles);
    } catch (error) {
        console.error("❌ Error fetching battles:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Like an outfit in a battle
exports.likeOutfit = async (req, res) => {
    try {
        const { battleId } = req.body;

        const battle = await DripBattle.findById(battleId);
        if (!battle) return res.status(404).json({ message: "Battle not found" });

        battle.likes += 1;
        await battle.save();

        res.status(200).json(battle);
    } catch (error) {
        console.error("❌ Error liking outfit:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
