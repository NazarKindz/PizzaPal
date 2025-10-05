export type SortProperty = 'rating' | '-rating' | 'price' | '-price' | 'title' | '-title';

export interface ISortType {
  name: string;
  sort: SortProperty;
};

export interface IFilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sortType: ISortType;
};
