export class Payment {
  userId?: string;
  email?: string;
  paymentMethodId?: string;
  productId?: string;
  amount?: number;
  sessionUrl?: string;

  constructor(
    userId?: string,
    email?: string,
    paymentMethodId?: string,
    productId?: string,
    amount?: number,
    sessionUrl?: string
  ) {
    this.userId = userId;
    this.email = email;
    this.paymentMethodId = paymentMethodId;
    this.productId = productId;
    this.amount = amount;
    this.sessionUrl = sessionUrl;
  }

  // Convert the map into the User object
  fromJson(json: Map<String, any>) {
    this.userId = json.get("user_id");
    this.email = json.get("email");
    this.paymentMethodId = json.get("payment_method_id");
    this.productId = json.get("product_id");
    this.amount = json.get("amount");
    this.sessionUrl = json.get("session_url");

    return this;
  }

  // Convert User Object into map
  toJson() {
    let data = new Map<String, any>();
    data.set("userId", this.userId);
    data.set("email", this.email);
    data.set("paymentMethodId", this.paymentMethodId);
    data.set("productId", this.productId);
    data.set("amount", this.amount);
    data.set("sessionUrl", this.sessionUrl);

    return data;
  }
}

export class GetPaymentResponse {
  payment?: Array<Payment>;

  constructor(payment?: Array<Payment>) {
    this.payment = payment;
  }

  // Convert JSON (containing list of data) to array
  fromJson(json: Map<String, any>) {
    if (json.get("Payment") != null) {
      this.payment = [];
      json.get("Payment").forEach((v: Map<String, any>) => {
        this.payment?.push(new Payment().fromJson(new Map(Object.entries(v))));
      });
    }

    return this.payment;
  }
}
