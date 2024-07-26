
import UserController from "../../controller/UserController"
import IdGenaratorMock from "../mocks/utils/IdGenaratorMock"
import UserDBMock from "../mocks/db/UserDBMock"
import { RequestMock, ResponseMock } from "../mocks/utils/ExpressMock";
import {Users} from "../../Entity/Users"


describe("Test Get All itens", () => {

    const userController = new UserController(
        new UserDBMock(),
        new IdGenaratorMock()
    )
    

    test("Test the returns sucess", async () => {
        // const req = {
        //     headers : {
        //         authorization: ""
        //     }
        // } as unknown as Request;

        const req = new RequestMock({"authorization": "aaa"})
        const res = new ResponseMock();

        await userController.getAll(req, res);

        expect(res.status.calledOnce).toBe(true);
        expect(res.status.getCall(0).args[0]).toBe(200);
        expect(res.send.getCall(0).args[0]).toStrictEqual([ 
            new Users("1", "User Mock", "Pass@123", "2024-07-23", [], "user@mock.com"),
            new Users("2", "User Mock 2", "Pass@123", "2024-07-23", [], "user@mock2.com")
        ])
    })

    test("Testing if the authorizathion is not informed", async () => {
        const req = new RequestMock();
        const res = new ResponseMock();

        await userController.getAll(req, res);

        expect(res.status.calledOnce).toBe(true);
        expect(res.status.getCall(0).args[0]).toBe(500);
        expect(res.json.getCall(0).args[0]).toStrictEqual("Não passou o headers")
    })
})