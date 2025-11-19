import { Publisher, Subjects, TicketCreatedEvent } from "@ticketsrv/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
