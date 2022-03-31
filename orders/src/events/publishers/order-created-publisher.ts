import { Publisher, OrderCreatedEvent, Subjects } from '@ebrym/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
