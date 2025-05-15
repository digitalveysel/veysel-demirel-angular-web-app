export enum ICategories {
  ALL = 'all',
}

export interface ICategory {
  id: string;
  slug: string;
  name: string;
  isActive?: boolean;
}
