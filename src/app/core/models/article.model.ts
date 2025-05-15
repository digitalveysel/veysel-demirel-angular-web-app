import { ICategory } from './category.model';
import { IListItem } from './list.model';

export interface IArticle {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: ICategory;
  sections?: ISection[];
  tags?: string[];
}

export interface ISection {
  id: string;
  blocks: IBlock[];
}

export enum IBlockTypes {
  TITLE = 'title',
  PARAGRAPH = 'paragraph',
  BLOCKQUOTE = 'blockquote',
  LIST = 'list',
  IMAGE = 'image',
  CODE = 'code',
}

export enum IRunTypes {
  TEXT = 'text',
  LINK = 'link',
}

export type IRun = ITextRun | ILinkRun;

export type IBlock =
  | ITitleBlock
  | IParagraphBlock
  | IBlockquoteBlock
  | IListBlock
  | IImageBlock
  | ICodeBlock;

export interface IBaseRun {
  id: string;
  type: 'text' | 'link';
}

export interface ITextRun extends IBaseRun {
  type: 'text';
  text: string;
}

export interface ILinkRun extends IBaseRun {
  type: 'link';
  text: string;
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
}

export interface IBaseBlock {
  id: string;
  type: 'title' | 'paragraph' | 'blockquote' | 'list' | 'image' | 'code';
  attributes?: Record<string, string>;
}

export interface ITitleBlock extends IBaseBlock {
  type: 'title';
  data: {
    level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    text: string;
  };
}

export interface IParagraphBlock extends IBaseBlock {
  type: 'paragraph';
  data: {
    runs: IRun[];
  };
}

export interface IBlockquoteBlock extends IBaseBlock {
  type: 'blockquote';
  data: {
    text: string;
    citeText?: string;
  };
}

export interface IListBlock extends IBaseBlock {
  type: 'list';
  data: {
    icon: string;
    items: IListItem[];
  };
}

export interface IImageBlock extends IBaseBlock {
  type: 'image';
  data: {
    src: string;
    alt: string;
  };
}

export interface ICodeBlock extends IBaseBlock {
  type: IBlockTypes.CODE;
  data: {
    source: string;
    language: string;
  };
}
