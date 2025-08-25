import express  from 'express'
import { home, login, register, user } from '../Controllers/auth-controllers.js';
 const Router = express.Router();
 import validate from '../middlewares/validators-middlewares.js';
 import signupSchema from '../validators/auth-validators.js';
 import loginSchema from '../validators/login-validators.js';
import authmiddlewares from '../middlewares/auth-middlewares.js';

 Router.get('/home',home);
 Router.post('/register',validate(signupSchema),register);
 Router.post('/login',validate(loginSchema),login);
 Router.get('/user',authmiddlewares,user);

 export default Router;  