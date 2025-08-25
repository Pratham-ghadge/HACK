import express from "express";
import {
  home,
  login,
  register,
  user,
  addStudent,
} from "../Controllers/auth-controllers.js";
import validate from "../middlewares/validators-middlewares.js";
import signupSchema from "../validators/auth-validators.js";
import loginSchema from "../validators/login-validators.js";
import authmiddlewares from "../middlewares/auth-middlewares.js";

const Router = express.Router();

Router.get("/home", home);
Router.post("/register", validate(signupSchema), register);
Router.post("/login", validate(loginSchema), login);
Router.get("/user", authmiddlewares, user);

// Router.post("/add-student", addStudent);

export default Router;
