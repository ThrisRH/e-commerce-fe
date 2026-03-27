import Attribute from "./attribute";

export default class Category {
  constructor(data = {}) {
    this.id = data.id ?? 0;
    this.name = data.name ?? "";
    this.slug = data.slug ?? "";
    this.description = data.description ?? "";
    this.image_url = data.image_url ?? "";
    this.parent_category = Category.fromJson(data?.parent_category) ?? null;
    this.is_active = data.is_active ?? false;
    this.sort_order = data.sort_order ?? 0;
    this.created_at = data.created_at ?? "";
    this.updated_at = data.updated_at ?? "";
    this.attributes = Attribute.fromJson(data?.attributes) ?? [];
  }

  static fromJson(json) {
    if (!json) return null;

    if (Array.isArray(json)) {
      return json.map((item) => new Category(item));
    }

    return new Category(json);
  }
}
