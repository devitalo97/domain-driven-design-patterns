import { assign } from "../../util/assign"

type PriceProps = {
    id: string
    label: string
    stock: number
    value: number
}

export default class Price {
    private _id: string
    private _label: string
    private _stock: number
    private _value: number

    constructor(props: PriceProps){
        assign(this, props)
    }

    get id(): string {
        return this._id
    }

    get label(): string {
        return this._label
    }

    get stock(): number {
        return this._stock
    }

    get value(): number {
        return this._value
    }
}