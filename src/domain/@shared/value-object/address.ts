import { assign } from "../../../util/assign";

type AddressProps = {
    state: string;
    city: string;
    street: string;
    number: string;
    complement: string;
    zipCode: string;
}

export default class Address {
    private _state: string;
    private _city: string;
    private _street: string;
    private _number: string;
    private _complement: string;
    private _zipCode: string;

    constructor(props: AddressProps){
        assign(this, props)
    }


    get state(): string{
        return this._state
    }

    get city(): string{
        return this._city
    }

    get street(): string{
        return this._street
    }

    get number(): string{
        return this._number
    }

    get complement(): string{
        return this._complement
    }

    get zipCode(): string{
        return this._zipCode
    }
}