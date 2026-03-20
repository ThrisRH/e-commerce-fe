export default class Product {
  constructor(data) {
    this.id = data?.id || 0;
    this.name = data?.name || '';
    this.slug = data?.slug || '';
    this.description = data?.description || '';
    this.price = data?.price || 0;
    this.image_url = data?.image_url || '';
    this.category_id = data?.category_id || 0;
    this.brand_id = data?.brand_id || 0;
    this.is_active = data?.is_active || false;
    this.stock = data?.stock || 0;
    this.specs = data?.specs || '';
    this.created_at = data?.created_at || '';
    this.updated_at = data?.updated_at || '';
  }

  get formattedPrice() {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(this.price);
  }

  static fromJson(json) {
    if (Array.isArray(json)) {
      return json.map((item) => new Product(item));
    }
    return new Product(json);
  }
}
