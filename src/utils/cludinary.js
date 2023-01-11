import { v4 as uuidv4 } from 'uuid';
// const cloudinary = require('cloudinary').v2;
import cloudinary from  'cloudinary';


// const app = express();

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

export default class cloudinari {
    static async uploadPhoto(req, res,file) {
        try {
            const results = await cloudinary.v2.uploader.upload(
                file.tempFilePath,
                {
                    public_id: "projects/myBrand/" + uuidv4()+'_'+Date.now()/1000,
                    overwrite: true,
                }
            );

            return results
        } catch (error) {
            return res.status(403).send({
                message:"Fail to save image on cloudinary",
                error:error.message
            })
        }
    }
}