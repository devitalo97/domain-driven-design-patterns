import Address from "../../@shared/value-object/address"
import CustomerFactory from "./customer.factory"

describe("customer factory test", () => {
    it.skip("should create a customer activated", () => {
        const customer = CustomerFactory.create({
            type: 'ACTIVATED',
            name: 'Customer#009',
        })

        expect(customer).toBeDefined()
        expect(customer.id).toBeDefined()
        expect(customer.isActive()).toBe(true)
    })

    it.skip("should create a customer with reward points", () => {
        
        const customer = CustomerFactory.create({
            type: 'POINTS',
            name: 'Customer#016',
        })

        expect(customer).toBeDefined()
        expect(customer.id).toBeDefined()
        expect(customer.isActive()).toBe(false)
        expect(customer.getPoints()).toBe(100)
    })

    it.skip("should create a customer with address", () => {
        const address = {
            state: 'state',
            city: 'city',
            street: 'street',
            number: 'number',
            complement: 'complement',
            zipCode: 'zipCode',
        }

        const customer = CustomerFactory.create({
            type: 'COMPLETE',
            name: 'Customer#016',
            address
        })

        expect(customer).toBeDefined()
        expect(customer.id).toBeDefined()
        expect(customer.isActive()).toBe(false)
        expect(customer.address).toStrictEqual(new Address(address))
    })


    it.skip("should create a customer with name", () => {
        const customer = CustomerFactory.create({
            type: 'BASIC',
            name: 'Customer#016',
        })

        expect(customer).toBeDefined()
        expect(customer.id).toBeDefined()
        expect(customer.isActive()).toBe(false)
    })
})