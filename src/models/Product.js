export default class Product {
  constructor(data = {}) {
    this.id = data?.id || 0;
    this.name = data?.name || "";
    this.slug = data?.slug || "";
    this.description = data?.description || "";
    this.price = Number(data?.price) || 0;
    this.image_url = data?.image_url || "";

    this.category = data?.category ?? { id: 0, name: "" };
    this.brand = data?.brand ?? { id: 0, name: "" };

    this.attributes = data?.attributes ?? [];

    this.is_active = data?.is_active || false;
    this.stock = data?.stock || 0;
    this.specs = data?.specs || "";
    this.created_at = data?.created_at || "";
    this.updated_at = data?.updated_at || "";
  }

  get formattedPrice() {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(this.price);
  }

  get categoryName() {
    return this.category?.name || "";
  }

  get brandName() {
    return this.brand?.name || "";
  }

  get attributeValueUnit() {
    return this.attributes
      .map((attribute) => {
        return `${attribute.value} ${attribute.unit}`;
      })
      .join(" ");
  }

  static fromJson(json) {
    if (Array.isArray(json)) {
      return json.map((item) => new Product(item));
    }
    return new Product(json);
  }
}
