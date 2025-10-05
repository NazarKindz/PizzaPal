export interface IFetchPizzasProps {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  currentPage: number;
};

export interface IPizza {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
};

export interface IPizzaSliceState {
  pizzas: IPizza[],
  status: Status
};