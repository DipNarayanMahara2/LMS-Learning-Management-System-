export enum Status {
  Loading = "loading",
  Success = " success",
  Error = "error",
}

export interface Icategory {
  _id: string;
  description: string;
  name: string;
  createdAt: string;
}

export interface ICategoryInitailState {
  categories: Icategory[];
  status: Status;
}
