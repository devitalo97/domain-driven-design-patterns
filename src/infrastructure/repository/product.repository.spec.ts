import { AppDataSource } from "../db/typeorm/database/data-source"
import ProductModel from "../db/typeorm/model/product.model"
import { v4 as uuid } from 'uuid'
import Product from "../../domain/entity/product"
import Price from "../../domain/entity/price"
import { transform } from "../../util/transform"
import ProductRepository from "./product.repository"

describe("product repository test", () => {

    beforeEach(async () => {
        await AppDataSource.initialize()
    })

    afterEach(async () => {
        await AppDataSource.destroy()
    })

    it.skip("should create a product", async () => {
        const repository = new ProductRepository()
        const product = new Product({
            id: uuid(),
            name: 'Product#00',
            prices: [
                new Price({
                    id: uuid(),
                    label: "gg",
                    value: 55.60,
                    stock: 180
                })
            ]
        })

        await repository.create(product)
        
        const productInDb = await AppDataSource
            .getRepository(ProductModel)
            .findBy({
                id: product.id
            })

        expect(productInDb).toBeDefined()
        expect(productInDb[0].id).toBe(product.id)
        expect(productInDb[0].name).toBe(product.name)
        expect(productInDb[0].prices).toStrictEqual(product.prices.map(price => ({
            id: price.id,
            label: price.label,
            value: price.value,
            stock: price.stock,
        })))
    })

    it.skip("should update a product", async () => {
        const repository = new ProductRepository()
        const product = new Product({
            id: uuid(),
            name: 'Product#01',
            prices: [
                new Price({
                    id: uuid(),
                    label: "pp",
                    value: 99.89,
                    stock: 160
                })
            ]
        })
        const created = AppDataSource.getRepository(ProductModel).create({
            ...transform(product, 'db'),
            prices: product.prices.map(price => transform(price, 'db'))
        })
        await AppDataSource.getRepository(ProductModel).save(created)

        product.changeName("Product#02")
        product.changePrice({
            id: product.prices[0].id,
            value: 120,
        })

        await repository.update(product)

        const productInDb = await AppDataSource
            .getRepository(ProductModel)
            .findBy({
                id: product.id
            })

        expect(productInDb[0].id).toBe(product.id)
        expect(productInDb[0].name).toBe(product.name)
        expect(productInDb[0].prices[0].value).toBe(120)
        expect(productInDb[0].name).toBe("Product#02")
        expect(productInDb[0].prices).toStrictEqual(product.prices.map(price => ({
            id: price.id,
            label: price.label,
            value: price.value,
            stock: price.stock,
        })))
    })

    it.skip("should find a product by id", async () => {
        const repository = new ProductRepository();
        const product = new Product({
            id: uuid(),
            name: 'Product#03',
            prices: [
                new Price({
                    id: uuid(),
                    label: "xxx",
                    value: 156.99,
                    stock: 21
                })
            ]
        })
        const created = AppDataSource.getRepository(ProductModel).create({
            ...transform(product, 'db'),
            prices: product.prices.map(price => transform(price, 'db'))
        })
        await AppDataSource.getRepository(ProductModel).save(created)

        const foundProduct = await repository.find(product.id)

        expect(foundProduct.id).toBe(product.id)
        expect(foundProduct.name).toBe(product.name)
        expect(foundProduct.prices).toStrictEqual(product.prices)
    })

    it.skip("should find all products", async () => {
        const repository = new ProductRepository();
        const product = new Product({
            id: uuid(),
            name: 'Product#04',
            prices: [
                new Price({
                    id: uuid(),
                    label: "12m²",
                    value: 156.99,
                    stock: 21
                })
            ]
        })
        const created = AppDataSource.getRepository(ProductModel).create({
            ...transform(product, 'db'),
            prices: product.prices.map(price => transform(price, 'db'))
        })
        await AppDataSource.getRepository(ProductModel).save(created)

        const products = await repository.findAll()
        
        expect(products.length > 1).toBe(true)
    })
})