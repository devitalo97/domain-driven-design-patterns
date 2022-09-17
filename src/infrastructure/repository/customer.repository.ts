import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer.repository.interface";
import { transform } from "../../util/transform";
import { AppDataSource } from "../db/typeorm/database/data-source";
import CustomerModel from "../db/typeorm/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
    private _db

    constructor(){
        this._db = AppDataSource.getMongoRepository(CustomerModel)
    }

    async create(entity: Customer): Promise<void> {
        const customer = this._db.create({
            ...transform(entity, 'db'),
            address: transform(entity.address, 'db')
        })
        await this._db.save(customer)
    }

    async update(entity: Customer): Promise<void> {
        const customer = {
            ...transform(entity, 'db'),
            address: transform(entity.address, 'db')
        }
        await this._db.update({id: entity.id}, customer)
    }

    async find(id: string): Promise<Customer> {
        try{
            const customer = await this._db.findOneBy({id})
            if(!customer){
                throw new Error("Client not found.")
            }
            return new Customer({
                id: customer.id,
                name: customer.name,
                address: new Address({...customer.address}),
                active: customer.active,
                rewardPoints: customer.rewardPoints,
            })
        }catch(e: any){
            throw new Error(e)
        }
    }

    async findAll(): Promise<Customer[]> {
        return (await this._db.find({})).map(customer => new Customer({
            ...customer,
            address: new Address({...customer.address}),
        }))
    }
    
}