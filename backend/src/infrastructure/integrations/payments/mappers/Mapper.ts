export interface Mapper<Domain, APIReq, APIRes> {
  fromDomainToAPITransactions(domain: Domain, acceptanceToken: string): APIReq;
  fromAPITransactionsToDomain(api: APIRes): Domain;
}
