export class ThresholdCheckEvent {
  constructor(
    public deviceId: string,
    public temperature: number,
    public ph: number,
    public tdo: number,
    public tds: number,
    public turbidities: number,
  ) {}
}
