import { Users } from "@src/Entity/Users";
import { DeepPartial, DeleteResult, FindManyOptions, FindOptionsWhere, ObjectId, Repository, SaveOptions, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export default class UserDBMock extends Repository<Users>{
    users: Users[] = [ 
        new Users("1", "User Mock", "Pass@123", "2024-07-23", [], "user@mock.com"),
        new Users("2", "User Mock 2", "Pass@123", "2024-07-23", [], "user@mock2.com")
    ];

    async find(options?: FindManyOptions<Users> | undefined): Promise<Users[]> {
        if(options && options.skip && options && options.take) return this.users.slice(options?.skip, options?.skip + options?.take);

        return this.users;
    }

    async save<T extends DeepPartial<Users>>(entity: T, options: SaveOptions & {
        reload: false;
    }): Promise<T>{
        this.users.push(entity as Users)
        return entity;
    };

    async update(criteria: string | number | Date | ObjectId | string[] | number[] | Date[] | ObjectId[] | FindOptionsWhere<Users>, partialEntity: { id?: string | (() => string) | undefined; name?: (() => string) | (string | null) | undefined; email?: string | (() => string) | undefined; password?: (() => string) | (string | null) | undefined; createdAt?: (() => string) | (string | null) | undefined; consultas?: (() => string) | { id?: string | (() => string) | undefined; name?: (() => string) | (string | null) | undefined; description?: (() => string) | (string | null) | undefined; status?: (() => string) | (string | null) | undefined; data?: (() => string) | (string | null) | undefined; createdAt?: (() => string) | (string | null) | undefined; updatedAt?: (() => string) | (string | null) | undefined; userId?: string | (() => string) | undefined; user?: QueryDeepPartialEntity<Users> | (() => string) | undefined; }[] | undefined; }): Promise<UpdateResult> {
        let affected: 0 | 1 = 0;
        this.users.find((user) => {
            if(user.id === criteria){
                user.name = partialEntity.name as string;
                user.password = partialEntity.password as string;

                affected = 1;
            }
        })
        
        return {
            generatedMaps: [],
            raw: [],
            affected
        } as UpdateResult;
    }

    async delete(criteria: string | number | string[] | Date | ObjectId | number[] | Date[] | ObjectId[] | FindOptionsWhere<Users>): Promise<DeleteResult> {
        let affected: 0 | 1 = 0;
        
        const user: Users | undefined= this.users.find(user => user.id === criteria);

        const userForDelete = this.users.indexOf(user as Users);
        
        const result = this.users.splice(userForDelete)

        if(result.length) affected = 1;

        return {
            raw: [],
            affected
        } as DeleteResult;
    }

}