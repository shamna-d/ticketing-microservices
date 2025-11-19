import { PaymentCreatedEvent, Publisher, Subjects } from "@ticketsrv/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
