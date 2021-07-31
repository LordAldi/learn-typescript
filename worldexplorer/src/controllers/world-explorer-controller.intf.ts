export interface WorldExplorerController {
  loadCountries(): Promise<void>;
  loadYears(): void;
  renderChart(): Promise<void>;
}
