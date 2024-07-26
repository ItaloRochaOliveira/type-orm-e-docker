import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { AppDataSource } from './Database/config'
import { userRouter } from './router/userRouter'

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



app.use("/users", userRouter);

export { app }

