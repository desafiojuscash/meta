import express from 'express';
import UserController from '../controllers/UserController.js';
import validate from '../middlewares/validate.js'
import createUser from '../schemas/createUser.js';

const router = express.Router();

const userController = new UserController();
router.post('/', validate(createUser) ,(req, res) => userController.createUser(req, res));

export default router;
