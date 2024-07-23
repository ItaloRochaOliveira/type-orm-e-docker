import UserController from "@src/controller/UserController";
import { AppDataSource } from "@src/Database/config";
import { Users } from "@src/Entity/Users";
import IdGenarator from "@src/utils/IdGenerator";
import express from "express";

const userRouter = express.Router();

const userController = new UserController(
    AppDataSource.getRepository(Users), 
    new IdGenarator()
);

userRouter.get("/users/getAll", userController.getAll);

userRouter.post("/users/create", userController.create);

userRouter.put("/users/edit/:id", userController.edit);

userRouter.delete("/users/delete/:id", userController.delete);

export {userRouter};