import { Subjects, Publisher, OrderCancelledEvent } from '@ebrym/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
