import { Users } from '../../Entity/Users';
import { Repository, FindManyOptions, SaveOptions, UpdateResult, DeleteResult, FindOptionsWhere, DeepPartial, EntityManager, EntityMetadata, EntityTarget, QueryRunner  } from 'typeorm';

export default class UserDBMock implements Repository<Users> {
    get metadata(): EntityMetadata {
        throw new Error('Method not implemented.');
    }
    findAndCountBy: sinon.SinonStub;
    target: EntityTarget<Users>;
    manager: EntityManager;
    queryRunner?: QueryRunner | undefined;
    createQueryBuilder: sinon.SinonStub;
    hasId: sinon.SinonStub;
    getId: sinon.SinonStub;
    create: sinon.SinonStub;
    merge: sinon.SinonStub;
    preload: sinon.SinonStub;
    remove: sinon.SinonStub;
    softRemove: sinon.SinonStub;
    recover: sinon.SinonStub;
    insert: sinon.SinonStub;
    upsert: sinon.SinonStub;
    softDelete: sinon.SinonStub;
    restore: sinon.SinonStub;
    exist: sinon.SinonStub;
    exists: sinon.SinonStub;
    existsBy: sinon.SinonStub;
    count: sinon.SinonStub;
    countBy: sinon.SinonStub;
    sum: sinon.SinonStub;
    average: sinon.SinonStub;
    minimum: sinon.SinonStub;
    maximum: sinon.SinonStub;
    findBy: sinon.SinonStub;
    findAndCount: sinon.SinonStub;
    findByIds: sinon.SinonStub;
    findOne: sinon.SinonStub;
    findOneBy: sinon.SinonStub;
    findOneById: sinon.SinonStub;
    findOneOrFail: sinon.SinonStub;
    findOneByOrFail: sinon.SinonStub;
    query: sinon.SinonStub;
    clear: sinon.SinonStub;
    increment: sinon.SinonStub;
    decrement: sinon.SinonStub;
    extend: sinon.SinonStub;

    users: Users[] = [ 
        new Users("1", "User Mock", "Pass@123", "2024-07-23", [], "user@mock.com"),
        new Users("2", "User Mock 2", "Pass@123", "2024-07-23", [], "user@mock2.com")
    ];

    async find(options?: FindManyOptions<Users>): Promise<Users[]> {
        if (options?.skip !== undefined && options?.take !== undefined) {
            return this.users.slice(options.skip, options.skip + options.take);
        }
        return this.users;
    }

    async save<T extends DeepPartial<Users>>(entity: T, options?: SaveOptions): Promise<T> {
        this.users.push(entity as Users);
        return entity;
    }

    async update(criteria: string | number | Date | FindOptionsWhere<Users>, partialEntity: Partial<Users>): Promise<UpdateResult> {
        let affected = 0;

        this.users.forEach(user => {
            if (user.id === criteria) {
                Object.assign(user, partialEntity);
                affected = 1;
            }
        });

        return {
            generatedMaps: [],
            raw: [],
            affected
        } as UpdateResult;
    }

    async delete(criteria: string | number | Date | FindOptionsWhere<Users>): Promise<DeleteResult> {
        let affected = 0;

        const index = this.users.findIndex(user => user.id === criteria);
        if (index !== -1) {
            this.users.splice(index, 1);
            affected = 1;
        }

        return {
            raw: [],
            affected
        } as DeleteResult;
    }
}
