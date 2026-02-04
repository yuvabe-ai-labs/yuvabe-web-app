const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// 1. Open the safe: Load variables from .env file
dotenv.config();

// 2. Write the note: Create the content for the browser file
const content = `
const swEnv = {
  apiKey: "${process.env.VITE_FIREBASE_API_KEY}",
  authDomain: "${process.env.VITE_FIREBASE_AUTH_DOMAIN}",
  projectId: "${process.env.VITE_FIREBASE_PROJECT_ID}",
  storageBucket: "${process.env.VITE_FIREBASE_STORAGE_BUCKET}",
  messagingSenderId: "${process.env.VITE_FIREBASE_MESSAGING_SENDER_ID}",
  appId: "${process.env.VITE_FIREBASE_APP_ID}",
};
`;

// 3. Place the note on the table: Write to the public folder
const outputPath = path.join(__dirname, "..", "public", "swEnv.js");

try {
  fs.writeFileSync(outputPath, content);
} catch (error) {
  console.error("Error creating swEnv.js:", error);
  process.exit(1);
}
