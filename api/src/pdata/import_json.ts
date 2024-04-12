import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { PastryModel } from '../models/pastry';
import mongoose from '../db/db';

async function main() {
    try {
        const __dirname = dirname(fileURLToPath(import.meta.url));
        const filePath = join(__dirname, "pastries_data", "pastries.json");
        const data = fs.readFileSync(filePath, 'utf8');
        const pastries = JSON.parse(data);

        const result = await PastryModel.insertMany(pastries);
        console.log(`${result.length} pastries have been successfully saved.`);
    } catch (error) {
        console.error('Failed to import pastries:', error);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    }
}

main();
