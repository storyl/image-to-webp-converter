import nextConnect from 'next-connect';
import multer from 'multer';
import sharp from 'sharp';

const upload = multer({ storage: multer.memoryStorage() });

const handler = nextConnect()
  .use(upload.array('images'))
  .post(async (req, res) => {
    try {
      const webpPromises = req.files.map(async (file) => {
        const webpBuffer = await sharp(file.buffer).webp({ quality: 80 }).toBuffer();
        const base64Data = webpBuffer.toString('base64');
        const fileName = `${file.originalname.split('.').slice(0, -1).join('.')}.webp`;
        return { fileName, base64Data };
      });

      const webpFiles = await Promise.all(webpPromises);

      res.status(200).json({ files: webpFiles });
    } catch (error) {
      console.error('Image processing error:', error);
      res.status(500).json({ error: 'Failed to process images.' });
    }
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;