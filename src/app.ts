import { Request, Response } from 'express'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { AppDataSource } from './Database/config'
import { Users } from './Entity/Users'
import { Consulta } from './Entity/Consulta'
import { createUserSchema, editUserSchema } from './controller/schemas/createUser.DTO'
import { UUID } from 'typeorm/driver/mongodb/bson.typings'
import { v4 } from 'uuid'

dotenv.config()

const app = express()

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.listen(Number(process.env.PORT) || 3003, () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`);
});

AppDataSource.initialize()
    .then( (data) => {
        // here you can start to work with your database
        console.log("DB working!");

        // console.log(data.getRepository(Users).find());
    })
    .catch((error) => console.log("Error: ", error))

// new Users("2", 'novo', "novo@gmail.com", "Pass", new Date().toISOString());

app.get("/users/getAll", async (req: Request, res: Response) => {
    try{
        const headers = req.headers.authorization;

        console.log(headers)

        if(!headers) throw new Error("Não passou o headers");

        const data = await AppDataSource.getRepository(Users).find();

        console.log(data)

        res.status(200).send(data)
    } catch(err) {
        console.log(err)
        if(err instanceof Error) res.status(500).json(err.message)
    }
});

app.post("/users/create", async (req: Request, res: Response) => {
    try{
        const createdData = createUserSchema.parse(req.body);

        const newData = new Users(v4(), createdData.name, createdData.password, new Date().toISOString(), [], createdData.email);

        const data = await AppDataSource.getRepository(Users).save(newData);

        console.log(data)

        res.status(200).send(data)
    } catch(err) {
        console.log(err)
        if(err instanceof Error) res.status(500).json(err.message)
    }
});

app.put("/users/edit/:id", async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const createdData = editUserSchema.parse(req.body);

        console.log(id)

        const data = await AppDataSource.getRepository(Users).update(id, {name: createdData.name, password: createdData.password});

        console.log(data)

        res.status(200).send(data)
    } catch(err) {
        console.log(err)
        if(err instanceof Error) res.status(500).json(err.message)
    }
});

app.delete("/users/delete/:id", async (req: Request, res: Response) => {
    try{
        const user= AppDataSource.getRepository(Users);
        const id = req.params.id;

        const userExist = await user.findBy({id});

        if(!userExist.length) throw new Error("Usuário já foi excluido ou não existe");

        const data = await user.delete(id);

        res.status(200).send(data)
    } catch(err) {
        console.log(err)
        if(err instanceof Error) res.status(500).json(err.message)
    }
})

export { app }

