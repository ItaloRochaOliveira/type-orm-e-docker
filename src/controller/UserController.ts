import { Users } from '../Entity/Users';
import { Request, Response } from 'express'
import { Repository } from 'typeorm';
import { createUserSchema, editUserSchema } from './schemas/createUser.DTO';
import IdGenarator from '../utils/IdGenerator';
import { ZodError } from 'zod';

export default class UserController {
    constructor(private userRepistory: Repository<Users>, private idGenate:IdGenarator){}

    getAll = async (req: Request, res: Response)  => {
        try{
            const headers = req.headers.authorization;
    
            if(!headers) throw new Error("Não passou o headers");
    
            const data = await this.userRepistory.find();
    
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
    
            const data = await this.userRepistory.save(newData);
    
            console.log(data)
    
            res.status(200).send(data)
        } catch(err) {
            console.log(err)
            if(err instanceof ZodError) res.status(400).json(err.issues[0]);
            if(err instanceof Error) res.status(500).json(err.message);
        }
    }

    edit = async (req: Request, res: Response) => {
        try{
            const id = req.params.id;
            const createdData = editUserSchema.parse(req.body);
    
            console.log(id)
    
            const data = await this.userRepistory.update(id, {name: createdData.name, password: createdData.password});
    
            console.log(data)
    
            res.status(200).send(data)
        } catch(err) {
            // console.log(err)
            if(err instanceof ZodError) res.status(400).json(err.issues[0]);
            if(err instanceof Error) res.status(500).json(err.message);
        }
    }

    delete = async (req: Request, res: Response) => {
        try{
            const user= this.userRepistory;
            const id = req.params.id;
    
            const userExist = await user.findBy({id});

            if(!userExist.length) throw new Error("Usuário já foi excluido ou não existe");
    
            const data = await user.delete(id);
    
            res.status(200).send(data);
        } catch(err) {
            // console.log(err)
            if(err instanceof ZodError) res.status(400).json(err.issues[0]);
            if(err instanceof Error) res.status(500).json(err.message)
        }
    }
}