export class PCPart {
  constructor(data) {
    this.id = data?.id || 0;
    this.name = data?.name || '';
    this.brand = data?.brand || '';
    this.price = data?.price || 0;
    this.image_url = data?.image_url || '';
    this.specs = data?.specs || '';
    this.category = data?.category || '';
    this.socket = data?.socket || '';
    this.wattage = data?.wattage || 0;
  }

  get formattedPrice() {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(this.price);
  }

  static fromJson(json) {
    if (Array.isArray(json)) {
      return json.map((item) => new PCPart(item));
    }
    return new PCPart(json);
  }
}

export class SelectedParts {
  constructor(data) {
    this.cpu = data?.cpu ? new PCPart(data.cpu) : null;
    this.mainboard = data?.mainboard ? new PCPart(data.mainboard) : null;
    this.ram = data?.ram ? new PCPart(data.ram) : null;
    this.storage = data?.storage ? new PCPart(data.storage) : null;
    this.gpu = data?.gpu ? new PCPart(data.gpu) : null;
    this.psu = data?.psu ? new PCPart(data.psu) : null;
    this.case = data?.case ? new PCPart(data.case) : null;
    this.cooler = data?.cooler ? new PCPart(data.cooler) : null;
  }

  get totalPrice() {
    return Object.values(this).reduce((sum, part) => {
      return sum + (part?.price || 0);
    }, 0);
  }

  get totalWattage() {
    return Object.values(this).reduce((sum, part) => {
      return sum + (part?.wattage || 0);
    }, 0);
  }

  get formattedTotal() {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(this.totalPrice);
  }
}
