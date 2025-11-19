import { Publisher, Subjects, TicketUpdatedEvent } from "@ticketsrv/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
