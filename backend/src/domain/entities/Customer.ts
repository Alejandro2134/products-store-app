export interface ICustomer {
  email: string;
  fullName: string;
  address: ICustomerAddress;
  id?: number;
}

export interface ICustomerFilter {
  email?: string;
}

interface ICustomerAddress {
  addressLine1: string;
  country: string;
  city: string;
  phoneNumber: string;
  region: string;
}

export class Customer {
  private id?: number;
  private email: string;
  private fullName: string;
  private address: ICustomerAddress;

  constructor(item: ICustomer) {
    this.id = item.id;
    this.email = item.email;
    this.fullName = item.fullName;
    this.address = {
      addressLine1: item.address.addressLine1,
      country: item.address.country,
      city: item.address.city,
      phoneNumber: item.address.phoneNumber,
      region: item.address.region,
    };
  }

  getEmail(): string {
    return this.email;
  }

  getFullName(): string {
    return this.fullName;
  }

  getAddress(): ICustomerAddress {
    return this.address;
  }

  getId(): number {
    return this.id || 0;
  }
}
