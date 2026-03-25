export default class Attribute {
  constructor(data = {}) {
    this.id = data?.id || 0;
    this.name = data?.name || "";
    this.value = data?.value || "";
    this.unit = data?.unit || "";
  }

  static fromJson(json) {
    if (Array.isArray(json)) {
      return json.map((item) => new Attribute(item));
    }
    return [new Attribute(json)];
  }
}
