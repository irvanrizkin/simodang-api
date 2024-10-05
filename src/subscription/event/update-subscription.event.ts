export class UpdateSubscriptionEvent {
  constructor(
    public subscriptionId: string,
    public status: number,
  ) {}
}
