import { assign } from "../../util/assign";
import Address from "./address";

type CustomerProps = {
    id: string;
    name: string;
    address?: Address;
    active?: boolean;
    rewardPoints?: number;
}

export default class Customer {
    private _id: string;
    private _name: string;
    private _address: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0

    constructor(props: CustomerProps){
        assign(this, props)
        this.validate()
    }

    get name(): string{
        return this._name
    }

    get id(): string{
        return this._id
    }

    get address(): Address{
        return this._address
    }

    get active(): boolean{
        return this._active
    }

    get rewardPoints(): number{
        return this._rewardPoints
    }

    validate(){
        if(this._id.length === 0){
            throw new Error("Id is required.")
        }
        if(this._name.length === 0){
            throw new Error("Name is required.")
        }
    }

    changeName(name: string){
        this._name = name
        this.validate()
    }

    activate(){
        if(this._address === undefined){
            throw new Error("Address is mandatory.")
        }
        this._active = true
    }

    deactivate(){
        this._active = false
    }

    isActive(): boolean{
        return this._active
    }

    getPoints(): number{
        return this._rewardPoints
    }

    addPoints(points: number){
        this._rewardPoints+=points
    }

    changeAddress(address: Address){
        this._address = address
    }

    
}