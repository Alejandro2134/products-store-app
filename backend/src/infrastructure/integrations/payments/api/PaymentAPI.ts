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

export type PaymentResponseError = {
  error: {
    type: string;
    messages: Record<string, string[]>;
  };
};

type PaymentMethods = {
  name: string;
  payment_processors: { name: string }[];
};

export type AcceptanceTokenResponse = {
  data: {
    id: number;
    name: string;
    email: string;
    contact_name: string;
    phone_number: string;
    active: boolean;
    logo_url: null;
    legal_name: string;
    legal_id_type: string;
    legal_id: string;
    public_key: string;
    accepted_currencies: string[];
    fraud_javascript_key: null;
    fraud_groups: [];
    accepted_payment_methods: string[];
    payment_methods: PaymentMethods[];
    presigned_acceptance: {
      acceptance_token: string;
      permalink: string;
      type: string;
    };
    presigned_personal_data_auth: {
      acceptance_token: string;
      permalink: string;
      type: string;
    };
    click_to_pay_dpa_id: null;
    mcc: null;
    acquirer_id: null;
  };
  meta: unknown;
};

export type AcceptanceTokenError = {
  error: {
    type: string;
    reason: string;
  };
};
