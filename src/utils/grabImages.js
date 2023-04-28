import { uploads } from './handleFileUploads';

const uploader = async (path) => await uploads(path, 'image');

const grabbingImage = async (req) => {
  const urls = [];
  const { files } = req.files;

  for (const file of files) {
    const { path } = file;
    const imageUploadResults = await uploader(path);
    urls.push(imageUploadResults);
  }

  return urls;
};

export default grabbingImage;
