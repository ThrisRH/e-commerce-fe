class Order {
  constructor(data) {
    this.id = data.id;
    this.shipping_name = data.shipping_name;
    this.shipping_phone = data.shipping_phone;
    this.shipping_address = data.shipping_address;

    this.total_amount = data.total_amount;
    this.shipping_fee = data.shipping_fee;

    this.status = data.status;
    this.payment_method = data.payment_method;
    this.payment_status = data.payment_status;
    this.note = data.note;
    this.items = data.items.map((item) => OrderItem.fromJson(item));
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static fromJson(data) {
    return new Order(data);
  }
}

class OrderItem {
  constructor(data) {
    this.id = data.id;
    this.order_id = data.order_id;
    this.product_id = data.product_id;
    this.quantity = data.quantity;
  }

  static fromJson(data) {
    return new OrderItem(data);
  }
}

export default Order;
