import Address from "./address"
import Customer from "./customer"
import { v4 as uuid } from 'uuid'

describe("customer entity unit test", () => {
    it.skip("should throw an error when id is empty", () => {
        expect(() => {
            const customer = new Customer({
                id: "",
                name: "Customer#00",
                address: new Address({
                    state: 'state',
                    city: 'city',
                    street: 'street',
                    number: 'number',
                    complement: 'complement',
                    zipCode: 'zipCode',
                }),
                active: false
            })
        }).toThrowError("Id is required.")
    })

    it.skip("should throw an error when name is empty", () => {
        expect(() => {
            const customer = new Customer({
                id: uuid(),
                name: "",
                address: new Address({
                    state: 'state',
                    city: 'city',
                    street: 'street',
                    number: 'number',
                    complement: 'complement',
                    zipCode: 'zipCode',
                }),
                active: false
            })
        }).toThrowError("Name is required.")
    })

    it.skip("should throw an error when trying to change the name to a blank string ", () => {
        const customer = new Customer({
            id: uuid(),
            name: "Customer#01",
            address: new Address({
                state: 'state',
                city: 'city',
                street: 'street',
                number: 'number',
                complement: 'complement',
                zipCode: 'zipCode',
            }),
            active: false
        })  
        
        expect(() => {
            customer.changeName("")
        }).toThrowError("Name is required.")
    })

    it.skip("should change name", () => {
        const customer = new Customer({
            id: uuid(),
            name: "Customer#01",
            address: new Address({
                state: 'state',
                city: 'city',
                street: 'street',
                number: 'number',
                complement: 'complement',
                zipCode: 'zipCode',
            }),
            active: false
        })  

        customer.changeName("Customer#02")
        
        expect(customer.name).toBe("Customer#02")
    })

    it.skip("should activate customer", () => {
        const customer = new Customer({
            id: uuid(),
            name: "Customer#04",
            address: new Address({
                state: 'state',
                city: 'city',
                street: 'street',
                number: 'number',
                complement: 'complement',
                zipCode: 'zipCode',
            }),
            active: false
        })  

        customer.activate()

        expect(customer.isActive()).toBe(true)
    })

    it.skip("should deactivate customer", () => {
        const customer = new Customer({
            id: uuid(),
            name: "Customer#04",
            address: new Address({
                state: 'state',
                city: 'city',
                street: 'street',
                number: 'number',
                complement: 'complement',
                zipCode: 'zipCode',
            }),
            active: false
        })  

        customer.deactivate()

        expect(customer.isActive()).toBe(false)
    })

    it.skip("should throw an error when trying to activate customer with no address", () => {
        const customer = new Customer({
            id: uuid(),
            name: "Customer#04",
        })  
        
        expect(() => {
            customer.activate()
        }).toThrowError('Address is mandatory.')

        
    })

    it.skip("should add reward points", () => {
        const customer = new Customer({
            id: uuid(),
            name: "Customer#01",
        })
        expect(customer.getPoints()).toBe(0)

        customer.addPoints(55)
        expect(customer.getPoints()).toBe(55)

        customer.addPoints(45)
        expect(customer.getPoints()).toBe(100)


    })
})