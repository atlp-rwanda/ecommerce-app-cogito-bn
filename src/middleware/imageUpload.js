import cloudinary from 'cloudinary';
// Set up Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const articleImage = async (req) => {
  try {
    const tmp = req.files.image.tempFilePath;
    const Result = await cloudinary.uploader.upload(
      tmp,
      { folder: 'My-Brand' },
      (_, result) => result,
    );
    return Result;
  } catch (error) {
    console.log(error);
  }
};
export default articleImage;
