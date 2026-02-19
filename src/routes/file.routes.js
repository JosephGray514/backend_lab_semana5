import { Router } from 'express';
import { upload } from '../middlewares/upload.middleware.js'
import { uploadFile, getFiles } from '../controllers/file.controller.js';

const router = Router();

// GET /upload
router.get('/', getFiles);
// POST /upload
router.post('/', upload.single('file'), uploadFile);

export default router;