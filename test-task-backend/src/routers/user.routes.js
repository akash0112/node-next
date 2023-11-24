const express = require('express');
const { UserController } = require('../controllers');
const { verifyToken } = require('../middlewares/authVerify');
const userRouter = express.Router();



userRouter.post('/signup', UserController.SignUpUser);
userRouter.post('/login', UserController.LoginUser);
module.exports = userRouter;