export type PartCategory =
  | 'cpu'
  | 'mainboard'
  | 'ram'
  | 'storage'
  | 'gpu'
  | 'psu'
  | 'case'
  | 'cooler';

export interface PCPart {
  id: number;
  name: string;
  brand: string;
  price: number;
  image_url: string;
  specs: string;
  category: PartCategory;
  socket?: string;
  wattage?: number;
}

export interface SelectedParts {
  cpu: PCPart | null;
  mainboard: PCPart | null;
  ram: PCPart | null;
  storage: PCPart | null;
  gpu: PCPart | null;
  psu: PCPart | null;
  case: PCPart | null;
  cooler: PCPart | null;
}
