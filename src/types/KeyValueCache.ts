export interface KeyValueCache<TValue> {
  data: Record<string, TValue>;
  constructor();
  set(key: string, val: TValue): void;
  get(key: string): TValue | null;
}
