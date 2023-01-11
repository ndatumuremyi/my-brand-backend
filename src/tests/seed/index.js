import fs from "fs"
import util from "util"
import path, {join} from "path"
import {fileURLToPath} from 'url';
import mongoose from "mongoose";

const readDir = util.promisify(fs.readdir)

function toTitleCase (str) {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
}

// Load seeds of all models
async function seedDatabase (runSaveMiddleware = false) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const dir = await readDir(__dirname)
    const seedFiles = dir.filter(f => f.endsWith('.seed.js'))

    for (const file of seedFiles) {
        const fileName = file.split('.seed.js')[0]
        const modelName = toTitleCase(fileName)
        const model = mongoose.models[modelName]

        if (!model) throw new Error(`Cannot find Model '${modelName}'`)
        const filePath = join(__dirname, file);
        const module = await import(filePath)
        const fileContents = module.default

        if(runSaveMiddleware){
            await model.create(fileContents)
        }else {
            await model.insertMany(fileContents)
        }
    }
}

export default seedDatabase;