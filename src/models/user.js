export class User {
  constructor(data = {}) {
    this.id = data?.id || 0;
    this.name = data?.name || "";
    this.email = data?.email || "";
    this.phone = data?.phone || "";
    this.roles = data?.roles || [];
  }

  static fromJson(json) {
    if (Array.isArray(json)) {
      return json.map((data) => new User(data));
    }
    return new User(json);
  }
}
