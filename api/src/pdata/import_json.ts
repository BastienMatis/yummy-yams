import fs from "fs";
import { join } from "path";
import { PastryModel } from "../models/pastry";

const sourcePdf = fs.readFileSync(join(__dirname, "pastries_data",));

async function main() {
    await PastryModel.updateMany(

    )
}