import express from 'express';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();

const authController = new AuthController();
router.post('/', (req, res) => authController.login(req, res));

export default router;
