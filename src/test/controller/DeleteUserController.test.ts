import UserController from "../../controller/UserController"
import IdGenaratorMock from "../mocks/utils/IdGenaratorMock"
import UserDBMock from "../mocks/db/UserDBMock"
import { RequestMock, ResponseMock } from "../mocks/utils/ExpressMock";
import {Users} from "../../Entity/Users"

describe("Testing the Delete Controller", () => {
    const userController = new UserController(
        new UserDBMock(),
        new IdGenaratorMock()
    );

    test("Testing if the user is deleted in the API", async () => {
        const req = new RequestMock({"authorization": "aaa"}, {id: "2"})
        let res = new ResponseMock();

        await userController.delete(req, res);

        expect(res.status.calledOnce).toBe(true);
        expect(res.status.getCall(0).args[0]).toBe(200);
        expect(res.send.getCall(0).args[0]).toStrictEqual(
            {
                "raw": [],
                "affected": 1
            }
        );

        res = new ResponseMock()
        await userController.getAll(req, res);

        expect(res.status.calledOnce).toBe(true);
        expect(res.status.getCall(0).args[0]).toBe(200);
        expect(res.send.getCall(0).args[0]).toStrictEqual([ 
            new Users("1", "User Mock", "Pass@123", "2024-07-23", [], "user@mock.com"),
        ])
    })

    test("Testing if the id is not informed", async () => {
        const req = new RequestMock({"authorization": "aaa"},/* {id: String()}*/);
        const res = new ResponseMock();
  
        await userController.delete(req, res);
  
        expect(res.status.calledOnce).toBe(true);
        expect(res.status.getCall(0).args[0]).toBe(500);
        expect(res.json.getCall(0).args[0]).toStrictEqual("Cannot read properties of undefined (reading 'id')");
      });
  
      test("Testing if date is not deleted in db", async() => {
        const req = new RequestMock({"authorization": "aaa"}, {id: "3"});
        const res = new ResponseMock();
  
        await userController.delete(req, res);
  
        expect(res.status.calledOnce).toBe(true);
        expect(res.status.getCall(0).args[0]).toBe(500);
        expect(res.json.getCall(0).args[0]).toStrictEqual("Usuário já foi excluido ou não existe");
      });
});