const { verifyToken } = require("@clerk/backend");

const verifyClerkSession = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authorization header is missing or invalid!" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const verifiedToken = await verifyToken(token, {
            jwtKey: process.env.CLERK_JWT_KEY,
        });

        req.user = { id: verifiedToken.payload.sub }; // Attach user ID to the request
        next();
    } catch (err) {
        console.error("❌ Error verifying Clerk session:", err.message);
        res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = verifyClerkSession;