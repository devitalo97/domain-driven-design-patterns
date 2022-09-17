import { assign } from "../../../util/assign";
import EventInterface from "../@shared/event.interface";

type ProductCreatedEventProps = {
    dataTimeOccurred: Date;
    eventData: any;
}

export default class ProductCreatedEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: any;

    constructor(props: ProductCreatedEventProps){
        assign(this, props)
        this.dataTimeOccurred = new Date()
    }
}