import Attribute from "./attribute";
import Brand from "./brand";
import Category from "./category";
import { Meta } from "./MetaData/meta";

export class Product {
  constructor(data = {}) {
    this.id = data?.id || 0;
    this.name = data?.name || "";
    this.slug = data?.slug || "";
    this.sku = data?.sku || "";
    this.description = data?.description || "";
    this.image_url = data?.image_url || "";
    this.variants = data?.variants || [];

    this.price_min = data?.price_min || 0;
    this.price_max = data?.price_max || 0;
    this.total_stock = data?.total_stock || 0;
    this.variants_count = data?.variants_count || 0;
    this.stock_status = data?.stock_status || "";

    this.category = new Category(data?.category);
    this.brand = new Brand(data?.brand);

    this.is_active = data?.is_active || false;

    this.created_at = data?.created_at || "";
    this.updated_at = data?.updated_at || "";
  }

  normalize() {
    return {
      id: this.id,
      name: this.name,
      slug: this.slug,
      description: this.description,
      image_url: this.image_url,
      category_id: this.category?.id ?? null,
      brand_id: this.brand?.id ?? null,
      is_active: this.is_active,
    };
  }

  get formattedPrice() {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(this.variants[0].price);
  }

  get categoryName() {
    return this.category?.name || "";
  }

  get brandName() {
    return this.brand?.name || "";
  }

  // get attributeValueUnit() {
  //   return this.attributes
  //     .map((attribute) => {
  //       return `${attribute.value} ${attribute.unit}`;
  //     })
  //     .join(" ");
  // }

  static fromJson(json) {
    if (Array.isArray(json)) {
      return json.map((item) => new Product(item));
    }
    return new Product(json);
  }
}

export class ProductResponse {
  constructor(data = {}) {
    this.data = Product.fromJson(data?.data ?? []);
    this.meta = new Meta(data?.meta);
  }
}

export class ProductDetail {
  constructor(data = {}) {
    this.id = data?.id || 0;
    this.name = data?.name || "";
    this.slug = data?.slug || "";

    this.product = {
      id: data?.product?.id ?? 0,
      name: data?.product?.name ?? "",
      brand: new Brand(data?.product?.brand),
      category: new Category(data?.product?.category),
    };

    this.variants = (data?.variants || []).map((v) => ({
      id: v.id,
      sku: v.sku,
      price: v.price,
      stock: v.stock,
      is_default: !!v.is_default,
      image_url: v.image_url,
      attributes: (v.attributes || []).map((attr) => ({
        attribute_id: attr.attribute_id,
        attribute_value_id: attr.attribute_value_id,
        attribute_name: attr.attribute_name,
        attribute_value: attr.attribute_value,
        attribute_unit: attr.attribute_unit,
      })),
    }));

    this.product_specifications = (data?.product_specifications || []).map(
      (spec) => ({
        attribute_id: spec.attribute_id,
        attribute_name: spec.attribute_name,
        value: spec.value,
        unit: spec.unit,
      }),
    );
  }

  static fromJson(json) {
    return new ProductDetail(json);
  }
}
