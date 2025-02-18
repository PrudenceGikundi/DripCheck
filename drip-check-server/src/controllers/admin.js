import User from "../models/User.js";

// @route   PUT /api/admin/update-role/:id
// @desc    Update user role (admin only)
export const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = req.body.role || "user"; // Default to "user" if not provided
    await user.save();

    res.json({ message: "User role updated successfully", user });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
