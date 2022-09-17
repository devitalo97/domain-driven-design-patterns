import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler"
import EventDispatcher from "./event-dispatcher"

const MockEventHandler = () => {
    return {
        handle: jest.fn()
    }
}

describe("domain events tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher()

        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDispatcher.register('ProductCreatedEvent', eventHandler)

        expect(eventDispatcher.getHandlers("ProductCreatedEvent")).toBeDefined()
        expect(eventDispatcher.getHandlers("ProductCreatedEvent").length).toBe(1)
        expect(eventDispatcher.getHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler)
    })

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher()

        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDispatcher.register('ProductCreatedEvent', eventHandler)

        expect(eventDispatcher.getHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler)

        eventDispatcher.unregister('ProductCreatedEvent', eventHandler)

        expect(eventDispatcher.getHandlers("ProductCreatedEvent")).toBeDefined()
        expect(eventDispatcher.getHandlers("ProductCreatedEvent").length).toBe(0)
    })

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher()

        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        const mockHandler = MockEventHandler()

        eventDispatcher.register('ProductCreatedEvent', eventHandler)
        eventDispatcher.register('ProductMockedEvent', mockHandler)

        eventDispatcher.unregisterAll()

        expect(eventDispatcher.getHandlers("ProductCreatedEvent")).toBeUndefined()
        expect(eventDispatcher.getHandlers("ProductMockedEvent")).toBeUndefined()

    })
})