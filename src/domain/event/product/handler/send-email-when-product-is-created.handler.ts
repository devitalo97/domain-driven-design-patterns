import EventHandlerInterface from "../../@shared/event-handler.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
    async handle(event: ProductCreatedEvent){
        console.log('sending email to')
    }
}