export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  category_id: number;
  brand_id: number;
  is_active: boolean;
  stock: number;
  specs: string;
  created_at: string;
  updated_at: string;
}
