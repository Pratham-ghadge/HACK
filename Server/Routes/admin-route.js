import express from 'express';
import { deleteUserById, getAllContacts, getAllUsers, getUserById, updateUserById, deleteContactById } from '../Controllers/admin-controllers.js';
import authmiddlewares from '../middlewares/auth-middlewares.js';
import { adminmiddlewares } from '../middlewares/admin-middlewares.js';


const Router = express.Router();

Router.route("/users/:id").get(authmiddlewares, adminmiddlewares, getUserById)
Router.route("/users/update/:id").patch(authmiddlewares, adminmiddlewares, updateUserById)

Router.get("/users", authmiddlewares, adminmiddlewares, getAllUsers);
Router.route("/users/delete/:id").delete(authmiddlewares, adminmiddlewares, deleteUserById)

Router.get("/contacts", authmiddlewares, adminmiddlewares, getAllContacts);
Router.route("/contacts/delete/:id").delete(authmiddlewares, adminmiddlewares, deleteContactById)

export default Router