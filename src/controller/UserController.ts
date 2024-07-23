import { AppDataSource } from '@src/Database/config';
import { Users } from '@src/Entity/Users';
import { Request, Response } from 'express'
import { Repository } from 'typeorm';
import { createUserSchema, editUserSchema } from './schemas/createUser.DTO';
import IdGenarator from '@src/utils/IdGenerator';

export default class UserController {
    constructor(private userRepistory: Repository<Users>, private idGenate:IdGenarator){}

    getAll = async (req: Request, res: Response)  => {
        try{
            const headers = req.headers.authorization;
    
            console.log(headers)
    
            if(!headers) throw new Error("Não passou o headers");
    
            const data = await this.userRepistory.find();
    
            console.log(data)
    
            res.status(200).send(data)
        } catch(err) {
            console.log(err)
            if(err instanceof Error) res.status(500).json(err.message)
        }
    }

    create = async (req: Request, res: Response) => {
        try{
            const createdData = createUserSchema.parse(req.body);
    
            const newData = new Users(this.idGenate.generate(), createdData.name, createdData.password, new Date().toISOString(), [], createdData.email);
    
            const data = await AppDataSource.getRepository(Users).save(newData);
    
            console.log(data)
    
            res.status(200).send(data)
        } catch(err) {
            console.log(err)
            if(err instanceof Error) res.status(500).json(err.message)
        }
    }

    edit = async (req: Request, res: Response) => {
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
    }

    delete = async (req: Request, res: Response) => {
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
    }
}