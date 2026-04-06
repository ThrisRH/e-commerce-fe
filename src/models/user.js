export class User {
  constructor(data = {}) {
    this.id = data?.id || 0;
    this.name = data?.name || "";
    this.email = data?.email || "";
    this.phone = data?.phone_number || "";
    this.roles = data?.roles || [];
    this.created_at = data?.created_at || null;
    this.updated_at = data?.updated_at || null;
  }

  static fromJson(json) {
    if (Array.isArray(json)) {
      return json.map((data) => new User(data));
    }
    return new User(json);
  }
}
