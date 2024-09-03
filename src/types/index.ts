export interface Geo {
  lat: string
  lng: string
}

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

export interface Filter {
  name: string
  username: string
  email: string
  phone: string
}

export interface FilterPayload {
  filter: keyof Filter;
  value: string
}

export interface UsersSlice {
  entities: User[]
  filteredEntities: User[]
  filters: Filter
  loading: boolean
  error: string | null
}