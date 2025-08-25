 import express from 'express'
import { contact } from '../Controllers/contact-controllers.js';
  const  Router = express.Router();


  Router.post('/contact',contact);


  export default Router;

