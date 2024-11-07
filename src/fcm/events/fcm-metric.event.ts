export class FcmMetricEvent {
  constructor(
    public topic: string,
    public temperatureString: string,
    public phString: string,
    public tdoString: string,
    public tdsString: string,
    public turbidityString: string,
  ) {}
}
