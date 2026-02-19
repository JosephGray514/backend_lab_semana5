import { getBucket } from '../db/mongo.js';

// POST /files
export async function uploadFile(req, res) {
    try {

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        console.log(` `)
        console.log(`POST`)
        console.log(`localhost:5000/files`)
        const { buffer, ...fileWithOutBuffer } = req.file;
        console.log(fileWithOutBuffer);
        console.log(` `)

        const bucket = getBucket();

        const uploadStream = bucket.openUploadStream(
            req.file.originalname,
            {
                conntentType: req.file.mimetype,
                metadata: {
                    uploadedAt: new Date(),
                    size: req.file.size
                }
            }
        )

        uploadStream.end(req.file.buffer);

        uploadStream.on('finish', () => {
            console.log(` `)
            console.log(`uploadStream.on('finish', () => {})`)
            const { buffer, ...fileWithOutBuffer } = req.file;
            console.log(fileWithOutBuffer);
            console.log(` `)

            return res.status(201).json({
                message: 'File uploaded succesfully',
                fileId: uploadStream.id,
                filename: uploadStream.filename,
                // file: fileWithOutBuffer
            });
        });

        uploadStream.on('error', () => {
            return res.status(500).json({
                message: 'Error uploading file',
                details: err.message
            });
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}