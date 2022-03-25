import { Publisher, Subjects, TicketUpdatedEvent } from '@ebrym/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
