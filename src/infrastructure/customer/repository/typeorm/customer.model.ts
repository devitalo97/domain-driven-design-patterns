import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectID } from 'mongodb'

@Entity()
export default class CustomerModel {
    @ObjectIdColumn()
    _id: ObjectID

    @Column()
    id: string

    @Column()
    name: string;

    @Column()
    address: {
        state: string;
        city: string;
        street: string;
        number: string;
        complement: string;
        zipCode: string;
    };
    
    @Column()
    active: boolean;
    
    @Column()
    rewardPoints?: number;
}