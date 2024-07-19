"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./Database/config");
const Users_1 = require("./Entity/Users");
const createUser_DTO_1 = require("./controller/schemas/createUser.DTO");
const uuid_1 = require("uuid");
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
app.use('/assets', express_1.default.static(path_1.default.join(__dirname, 'assets')));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(Number(process.env.PORT) || 3003, () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`);
});
config_1.AppDataSource.initialize()
    .then((data) => {
    console.log("DB working!");
})
    .catch((error) => console.log("Error: ", error));
app.get("/users/getAll", async (req, res) => {
    try {
        const headers = req.headers.authorization;
        console.log(headers);
        if (!headers)
            throw new Error("Não passou o headers");
        const data = await config_1.AppDataSource.getRepository(Users_1.Users).find();
        console.log(data);
        res.status(200).send(data);
    }
    catch (err) {
        console.log(err);
        if (err instanceof Error)
            res.status(500).json(err.message);
    }
});
app.post("/users/create", async (req, res) => {
    try {
        const createdData = createUser_DTO_1.createUserSchema.parse(req.body);
        const newData = new Users_1.Users((0, uuid_1.v4)(), createdData.name, createdData.password, new Date().toISOString(), [], createdData.email);
        const data = await config_1.AppDataSource.getRepository(Users_1.Users).save(newData);
        console.log(data);
        res.status(200).send(data);
    }
    catch (err) {
        console.log(err);
        if (err instanceof Error)
            res.status(500).json(err.message);
    }
});
app.put("/users/edit/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const createdData = createUser_DTO_1.editUserSchema.parse(req.body);
        console.log(id);
        const data = await config_1.AppDataSource.getRepository(Users_1.Users).update(id, { name: createdData.name, password: createdData.password });
        console.log(data);
        res.status(200).send(data);
    }
    catch (err) {
        console.log(err);
        if (err instanceof Error)
            res.status(500).json(err.message);
    }
});
app.delete("/users/delete/:id", async (req, res) => {
    try {
        const user = config_1.AppDataSource.getRepository(Users_1.Users);
        const id = req.params.id;
        const userExist = await user.findBy({ id });
        if (!userExist.length)
            throw new Error("Usuário já foi excluido ou não existe");
        const data = await user.delete(id);
        res.status(200).send(data);
    }
    catch (err) {
        console.log(err);
        if (err instanceof Error)
            res.status(500).json(err.message);
    }
});
//# sourceMappingURL=app.js.map