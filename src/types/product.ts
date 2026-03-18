export interface Product {
  id: number;
  name: string;
  specs: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  sale_price: number;
  image_url: string;
  category_id: number;
  brand_id: number;
  is_active: boolean;
  stock: number;
  created_at: string;
  updated_at: string;
}
