import { login, register,logout,currentUser } from '../controllers/auth';

// middlewares
import {requireSignIn} from "../middlewares";


import express from 'express';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/current-user',requireSignIn, currentUser);
module.exports = router;
