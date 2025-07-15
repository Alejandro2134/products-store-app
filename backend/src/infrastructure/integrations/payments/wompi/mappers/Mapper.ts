export interface Mapper<Domain, APIReq, APIRes> {
  fromDomainToAPITransactions(domain: Domain): APIReq;
  fromAPITransactionsToDomain(api: APIRes): Domain;
}
