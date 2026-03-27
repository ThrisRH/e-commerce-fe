export default class Brand {
  constructor(data = {}) {
    this.id = data?.id || 0;
    this.name = data?.name || "";
    this.slug = data?.slug || "";
    this.description = data?.description || "";
    this.created_at = data?.created_at || "";
    this.updated_at = data?.updated_at || "";
  }

  static fromJson(json) {
    if (Array.isArray(json)) {
      return json.map((item) => new Brand(item));
    }
    return new Brand(json);
  }
}
