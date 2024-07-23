import UserController from "../controller/UserController";
import { AppDataSource } from "..//Database/config";
import { Users } from "..//Entity/Users";
import IdGenarator from "..//utils/IdGenerator";
import express from "express";

const userRouter = express.Router();

const userController = new UserController(
    AppDataSource.getRepository(Users), 
    new IdGenarator()
);

userRouter.get("/getAll", userController.getAll);

userRouter.post("/create", userController.create);

userRouter.put("/edit/:id", userController.edit);

userRouter.delete("/delete/:id", userController.delete);

export {userRouter};