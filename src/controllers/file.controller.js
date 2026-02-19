import { getBucket } from '../db/mongo.js';

export async function getFiles(req, res) {
    try {
        const bucket = getBucket();
        const files = await bucket
            .find({}, { sort: { uploadDate: -1 } })
            .toArray();

        const filesInfo = files.map((file) => ({
            fileId: file._id,
            filename: file.filename,
            contentType: file.contentType ?? null,
            size: file.length,
            uploadDate: file.uploadDate,
            metadata: file.metadata ?? {}
        }));

        return res.status(200).json({
            total: filesInfo.length,
            files: filesInfo
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error getting files',
            details: error.message
        });
    }
}

// POST /files
export async function uploadFile(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        console.log(` `)
        console.log(`POST`)
        console.log(`/upload`)
        const { buffer, ...fileWithOutBuffer } = req.file;
        console.log(fileWithOutBuffer);
        console.log(` `)

        const bucket = getBucket();

        const uploadStream = bucket.openUploadStream(
            req.file.originalname,
            {
                contentType: req.file.mimetype,
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
            });
        });

        uploadStream.on('error', (err) => {
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
