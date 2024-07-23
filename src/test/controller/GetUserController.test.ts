
import { Request } from "express";
import UserController from "./UserController"
import IdGenaratorMock from "../mocks/utils/IdGenaratorMock"
import { Users } from "@src/Entity/Users"
import { EntityManager } from "typeorm"
import UserDBMock from "@src/test/mocks/db/UserDBMock..test"


describe("Test Get All itens", () => {
    const userController = new UserController(
        new UserDBMock(Users, {} as EntityManager),
        new IdGenaratorMock()
    )

    test("Test the returns sucess", () => {
        let req: Request = {
            headers : {
                authorization: ""
            }
        } as Request;

        const res: Response = {
            status: 1,
        }  as Response;

        userController.getAll(req, res)
    })
})