export interface MapperModel<Domain, Model> {
  fromModelToDomain(model: Model): Domain;
}

export interface MapperDomain<Domain, Model> {
  fromDomainToModel(domain: Domain): Model;
}

export interface MapperPartialDomain<Domain, Model> {
  fromPartialDomainToModel(domain: Partial<Domain>): Model;
}
