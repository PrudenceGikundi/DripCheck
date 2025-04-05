const { createClerkClient } = require("@clerk/backend");

if (!process.env.CLERK_SECRET_KEY || !process.env.CLERK_JWT_KEY) {
    console.error("❌ Clerk Secret Key or JWT Key is missing. Check your .env file.");
} else {
    console.log("✅ Clerk Keys loaded successfully.");
}

const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
    jwtKey: process.env.CLERK_JWT_KEY, // Use the public key for JWT verification
});

module.exports = clerkClient;