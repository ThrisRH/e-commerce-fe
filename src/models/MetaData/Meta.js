export class Meta {
  constructor(data = {}) {
    this.total = data?.total || 0;
    this.per_page = data?.per_page || 0;
    this.current_page = data?.current_page || 0;
    this.last_page = data?.last_page || 0;
  }
}
