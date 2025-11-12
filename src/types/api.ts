export interface ListMeta {
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface QueryResponse<DataType> {
  page: ListMeta;
  content: DataType;
}
