
import UserController from "../../controller/UserController"
import IdGenaratorMock from "../mocks/utils/IdGenaratorMock"
import UserDBMock from "../mocks/db/UserDBMock"
import { RequestMock, ResponseMock } from "../mocks/utils/ExpressMock";


describe("Test Get All itens", () => {
    const userController = new UserController(
        new UserDBMock(),
        new IdGenaratorMock()
    )
    

    test("Test the returns sucess", () => {
        // const req = {
        //     headers : {
        //         authorization: ""
        //     }
        // } as unknown as Request;

        const req = new RequestMock({"Authorization": "aaa"})

        const res = new ResponseMock();

        userController.getAll(req, res);

        expect(res.status.calledOnce).toBe(true);
    })
})