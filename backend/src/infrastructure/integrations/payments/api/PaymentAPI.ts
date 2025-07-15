export type PaymentRequest = {
  acceptance_token: string;
  amount_in_cents: number;
  currency: string;
  signature: string;
  customer_email: string;
  payment_method: {
    type: string;
    token: string;
    installments: number;
  };
  reference: string;
  customer_data: {
    full_name: string;
  };
  shipping_address: {
    address_line_1: string;
    country: string;
    region: string;
    city: string;
    phone_number: string;
  };
};

export type PaymentResponse = {
  data: {
    id: string;
    created_at: string;
    amount_in_cents: number;
    status: string;
    reference: string;
    customer_email: string;
    currency: string;
    payment_method_type: string;
    payment_method: {
      type: string;
      phone_number: number;
    };
    shipping_address: {
      address_line_1: string;
      country: string;
      region: string;
      city: string;
      phone_number: number;
    };
    redirect_url: string;
    payment_link_id: null;
  };
};
