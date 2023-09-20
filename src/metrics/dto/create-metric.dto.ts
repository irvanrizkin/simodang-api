export class CreateMetricDto {
  pool_id: string;
  device_id: string;
  temper_val: number;
  ph_val: number;
  oxygen_val: number;
  tds_val: number;
  turbidities_val: number;
  created_at: string;
}
