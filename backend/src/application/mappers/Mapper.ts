export interface MapperDomain<Domain, DTO> {
  fromDomainToDTO(domain: Domain): DTO;
}

export interface MapperDTO<Domain, DTO> {
  fromDTOToDomain(dto: DTO): Domain;
}
