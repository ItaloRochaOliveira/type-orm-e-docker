
import UserController from "../../controller/UserController"
import IdGenaratorMock from "../mocks/utils/IdGenaratorMock"
import UserDBMock from "../mocks/db/UserDBMock"
import { RequestMock, ResponseMock } from "../mocks/utils/ExpressMock";
import {Users} from "../../Entity/Users"


describe("Test Edit Users", () => {
    //Testar o retorno sem id e quando não for salvo no db
    const userController = new UserController(
        new UserDBMock(),
        new IdGenaratorMock()
    )
    

    test("Test the returns edit sucess and add item in db mock", async () => {
        const req = new RequestMock({"authorization": "aaa"}, {id: "2"});
        let res = new ResponseMock();
        console.log("consoleeee", req.params.id)
        req.body = {
            name: "User Mock 21",
            password: "Pass@12"
        };

        await userController.edit(req, res);

        expect(res.status.calledOnce).toBe(true);
        expect(res.status.getCall(0).args[0]).toBe(200);
        expect(res.send.getCall(0).args[0]).toStrictEqual({
            "generatedMaps": [],
            "raw": [],
            "affected": 1
        });

        res = new ResponseMock()
        await userController.getAll(req, res);

        expect(res.status.calledOnce).toBe(true);
        expect(res.status.getCall(0).args[0]).toBe(200);
        expect(res.send.getCall(0).args[0]).toStrictEqual([ 
            new Users("1", "User Mock", "Pass@123", "2024-07-23", [], "user@mock.com"),
            new Users("2", "User Mock 21", "Pass@12", "2024-07-23", [], "user@mock2.com"),
        ])
    })

    test("Testing if the body is not informed", async () => {
        const req = new RequestMock({"authorization": "aaa"}, {id: "2"});
        const res = new ResponseMock();

        await userController.edit(req, res);

        expect(res.status.called).toBe(true);
        expect(res.status.getCall(0).args[0]).toBe(400);
        expect(res.json.getCall(0).args[0]).toStrictEqual(
        {
            code: "invalid_type",
            expected: "object",
            received: "undefined",
            path: [],
            message: "Required"
          }
      
         
      )  ;
    });

    test("Testing if the passed body but without name", async () => {
      const req = new RequestMock({"authorization": "aaa"}, {id: "2"});
      const res = new ResponseMock();
      req.body = {
        password: "Pass@123"
    };

      await userController.edit(req, res);

      expect(res.status.called).toBe(true);
      expect(res.status.getCall(0).args[0]).toBe(400);
      expect(res.json.getCall(0).args[0]).toStrictEqual(
      {
          code: "invalid_type",
          expected: "string",
          received: "undefined",
          path: [
            'name'
          ],
          message: "Required"
        }
    
       
    )  ;
  })

  test("Testing if the passed body but with name but no appropriate length", async () => {
    const req = new RequestMock({"authorization": "aaa"}, {id: "2"});
    const res = new ResponseMock();
    req.body = {
      name: "",
      password: "Pass@123"
  };

    await userController.edit(req, res);
    console.log(res.json.getCall(0).args[0])
    expect(res.status.called).toBe(true);
    expect(res.status.getCall(0).args[0]).toBe(400);
    expect(res.json.getCall(0).args[0]).toStrictEqual(
      {
        code: 'too_small',
        minimum: 1,
        type: 'string',
        inclusive: true,
        exact: false,
        message: 'String must contain at least 1 character(s)',
        path: [ 'name' ]
      }
  )  ;
})

    test("Testing if the passed body but without password", async () => {
      const req = new RequestMock({"authorization": "aaa"}, {id: "2"});
      const res = new ResponseMock();
      req.body = {
        name: "user3"
      };  
  
      await userController.edit(req, res);
  
      expect(res.status.called).toBe(true);
      expect(res.status.getCall(0).args[0]).toBe(400);
      expect(res.json.getCall(0).args[0]).toStrictEqual(
      {
          code: "invalid_type",
          expected: "string",
          received: "undefined",
          path: [
            'password'
          ],
          message: "Required"
        }
  
      
      )  ;
      })
  
      test("Testing if the passed body but with password but no appropriate length", async () => {
      const req = new RequestMock({"authorization": "aaa"}, {id: "2"});
      const res = new ResponseMock();
      req.body = {
        name: "user3",
        password: ""
      };
  
      await userController.edit(req, res);

      expect(res.status.called).toBe(true);
      expect(res.status.getCall(0).args[0]).toBe(400);
      expect(res.json.getCall(0).args[0]).toStrictEqual(
        {
          code: 'too_small',
          minimum: 1,
          type: 'string',
          inclusive: true,
          exact: false,
          message: 'String must contain at least 1 character(s)',
          path: [ 'password' ]
        }
      )  ;
      })
})