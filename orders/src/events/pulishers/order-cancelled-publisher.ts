import { Publisher, OrderCancelledEvent, Subjects } from "@ticketsrv/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
