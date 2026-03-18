const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

try {
    const prisma = new PrismaClient({ accelerateUrl: process.env.DATABASE_URL });
    console.log("Success with accelerateUrl:", prisma);
    process.exit(0);
} catch (e) {
    console.error("Failed:", e.message);
}
