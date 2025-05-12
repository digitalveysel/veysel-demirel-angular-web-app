import { ICategory } from './category.model';

export interface IArticle {
  id: string;
  category: ICategory;
  title: string;
  description: string;
  link: string;
}
