import { Publisher, Subjects, TicketCreatedEvent } from '@ebrym/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
