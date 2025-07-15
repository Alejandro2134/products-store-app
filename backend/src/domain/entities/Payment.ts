interface IPayment {
  customerFullName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  customerAddressLine1: string;
  customerCountry: string;
  customerRegion: string;
  customerCity: string;
  customerPhoneNumber: string;
  method: string;
  token: string;
}

export class Payment {
  private customerFullName: string;
  private customerEmail: string;
  private amount: number;
  private currency: string;
  private customerAddressLine1: string;
  private customerCountry: string;
  private customerRegion: string;
  private customerCity: string;
  private customerPhoneNumber: string;
  private status: string;
  private method: string;
  private token: string;

  constructor(item: IPayment) {
    this.customerFullName = item.customerFullName;
    this.customerEmail = item.customerEmail;
    this.amount = item.amount;
    this.currency = item.currency;
    this.customerAddressLine1 = item.customerAddressLine1;
    this.customerCountry = item.customerCountry;
    this.customerRegion = item.customerRegion;
    this.customerCity = item.customerCity;
    this.customerPhoneNumber = item.customerPhoneNumber;
    this.status = 'PENDING';
    this.method = item.method;
    this.token = item.token;
  }

  getCustomerFullName(): string {
    return this.customerFullName;
  }

  getCustomerEmail(): string {
    return this.customerEmail;
  }

  getAmount(): number {
    return this.amount;
  }

  getCurrency(): string {
    return this.currency;
  }

  getCustomerAddressLine1(): string {
    return this.customerAddressLine1;
  }

  getCustomerCountry(): string {
    return this.customerCountry;
  }

  getCustomerRegion(): string {
    return this.customerRegion;
  }

  getCustomerCity(): string {
    return this.customerCity;
  }

  getCustomerPhoneNumber(): string {
    return this.customerPhoneNumber;
  }

  getStatus(): string {
    return this.status;
  }

  getMethod(): string {
    return this.method;
  }

  getToken(): string {
    return this.token;
  }
}
