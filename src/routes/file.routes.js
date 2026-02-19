import { Router } from 'express';
import { upload } from '../middlewares/upload.middleware.js'
import { uploadFile } from '../controllers/file.controller.js';

const router = Router();

// POST /files
router.post('/', upload.single('file'), uploadFile);

export default router;