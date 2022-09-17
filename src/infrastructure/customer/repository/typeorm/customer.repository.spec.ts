import Address from "../../../../domain/@shared/value-object/address"
import Customer from "../../../../domain/customer/entity/customer"
import { v4 as uuid } from 'uuid'
import CustomerModel from "./customer.model"
import CustomerRepository from "./customer.repository"
import { transform } from "../../../../util/transform"
import { AppDataSource } from "./database/data-source"

describe("customer repository test", () => {
    beforeEach(async () => {
        await AppDataSource.initialize()
    })

    afterEach(async () => {
        await AppDataSource.destroy()
    })

    it("should create a customer", async () => {
        const repository = new CustomerRepository()

        const customer = new Customer({
            id: uuid(),
            name: 'Customer#00',
            rewardPoints: 100,
            address: new Address({
                state: 'state',
                city: 'city',
                street: 'street',
                number: 'number',
                complement: 'complement',
                zipCode: 'zipCode',
            })
        })

        await repository.create(customer)

        const customerInDb = await AppDataSource.getRepository(CustomerModel).findBy({
            id: customer.id
        })

        expect(customerInDb).toBeDefined()
        expect(customerInDb[0].id).toBe(customer.id)
        expect(customerInDb[0].name).toBe(customer.name)
        expect(customerInDb[0].rewardPoints).toBe(customer.getPoints())
        expect(customerInDb[0].address).toStrictEqual({
            state: customer.address.state,
            city: customer.address.city,
            street: customer.address.street,
            number: customer.address.number,
            complement: customer.address.complement,
            zipCode: customer.address.zipCode,
        })
    })

    it("should update a customer", async () => {
        const repository = new CustomerRepository()

        const customer = new Customer({
            id: uuid(),
            name: 'Customer#01',
            rewardPoints: 100,
            address: new Address({
                state: 'state',
                city: 'city',
                street: 'street',
                number: 'number',
                complement: 'complement',
                zipCode: 'zipCode',
            })
        })

        const created = AppDataSource.getRepository(CustomerModel).create({
            ...transform(customer, 'db'),
            address: transform(customer.address, 'db')
        })

        await AppDataSource.getRepository(CustomerModel).save(created)

        customer.addPoints(200)
        customer.changeName("Customer#02")
        customer.activate()
        customer.changeAddress(new Address({
            state: 'new state',
            city: 'new city',
            street: 'new street',
            number: 'new number',
            complement: 'new complement',
            zipCode: 'new zipCode',
        }))

        await repository.update(customer)

        const customerInDb = await AppDataSource.getRepository(CustomerModel).findBy({
            id: customer.id
        })

        expect(customerInDb).toBeDefined()
        expect(customerInDb[0].id).toBe(customer.id)
        expect(customerInDb[0].name).toBe(customer.name)
        expect(customerInDb[0].active).toBe(customer.isActive())
        expect(customerInDb[0].rewardPoints).toBe(customer.getPoints())
        expect(customerInDb[0].address).toStrictEqual({
            state: customer.address.state,
            city: customer.address.city,
            street: customer.address.street,
            number: customer.address.number,
            complement: customer.address.complement,
            zipCode: customer.address.zipCode,
        })
    })

    it("should find a customer by id", async () => {
        const repository = new CustomerRepository()

        const customer = new Customer({
            id: uuid(),
            name: 'Customer#03',
            rewardPoints: 78,
            address: new Address({
                state: 'state',
                city: 'city',
                street: 'street',
                number: 'number',
                complement: 'complement',
                zipCode: 'zipCode',
            })
        })

        const created = AppDataSource.getRepository(CustomerModel).create({
            ...transform(customer, 'db'),
            address: transform(customer.address, 'db')
        })

        await AppDataSource.getRepository(CustomerModel).save(created)

        const foundCustomer = await repository.find(customer.id)

        expect(foundCustomer.id).toBe(customer.id)
        expect(foundCustomer.name).toBe(customer.name)
        expect(foundCustomer.rewardPoints).toBe(customer.rewardPoints)
        expect(foundCustomer.isActive()).toBe(customer.isActive())
        expect(foundCustomer.address).toStrictEqual(customer.address)
    })

    it("should throw an error if customer not found", async () => {
        const repository = new CustomerRepository()
        await expect(async () => {
            await repository.find(uuid())
        }).rejects.toThrow("Client not found.")
    })

    it("should find all customers", async () => {
        const repository = new CustomerRepository()
        const customerOne = new Customer({
            id: uuid(),
            name: 'Customer#04',
            rewardPoints: 78,
            address: new Address({
                state: 'state',
                city: 'city',
                street: 'street',
                number: 'number',
                complement: 'complement',
                zipCode: 'zipCode',
            })
        })

        const customerTwo = new Customer({
            id: uuid(),
            name: 'Customer#05',
            rewardPoints: 78,
            address: new Address({
                state: 'state',
                city: 'city',
                street: 'street',
                number: 'number',
                complement: 'complement',
                zipCode: 'zipCode',
            })
        })

        const created = AppDataSource.getRepository(CustomerModel).create([
            {
                ...transform(customerOne, 'db'),
                address: transform(customerOne.address, 'db')
            },
            {
                ...transform(customerTwo, 'db'),
                address: transform(customerTwo.address, 'db')
            }
        ])

        await AppDataSource.getRepository(CustomerModel).save(created)

        const foundCustomers = await repository.findAll()

        expect(foundCustomers).toBeDefined()
        expect(foundCustomers.length >= 2).toBe(true)
    })
})