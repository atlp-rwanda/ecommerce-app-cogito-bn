import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default class CloudUpload {
  static async single(file) {
    const image = file.buffer.toString('base64');
    const uploadStr = `data:${file.mimetype};base64,${image}`;
    const result = await cloudinary.uploader.upload(uploadStr);
    return result;
  }

  static async multi(files) {
    const results = [];
    for (const file of files) {
      const newPath = await this.single(file);
      results.push(newPath);
    }
    return results;
  }
}
