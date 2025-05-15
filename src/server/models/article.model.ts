import { Category } from './category.model';
import { List } from './list.model';

export interface Article {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: Category;
  sections?: Section[];
  tags?: string[];
}

export interface Section {
  id: string;
  blocks: Block[];
}

export type Block =
  | TitleBlock
  | ParagraphBlock
  | BlockquoteBlock
  | ListBlock
  | ImageBlock
  | CodeBlock;

export interface BaseBlock {
  id: string;
  type: 'title' | 'paragraph' | 'blockquote' | 'list' | 'image' | 'code';
  attributes?: Record<string, string>;
}

export interface TitleBlock extends BaseBlock {
  type: 'title';
  data: {
    level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    text: string;
  };
}

export interface ParagraphBlock extends BaseBlock {
  type: 'paragraph';
  data: {
    runs: Run[];
  };
}

export interface BlockquoteBlock extends BaseBlock {
  type: 'blockquote';
  data: {
    text: string;
    citeText?: string;
  };
}

export interface ListBlock extends BaseBlock {
  type: 'list';
  data: List;
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  data: {
    src: string;
    alt: string;
  };
}

export interface CodeBlock extends BaseBlock {
  type: 'code';
  data: {
    source: string;
    language: string;
  };
}

export type Run = TextRun | LinkRun;

export interface BaseRun {
  id: string;
  type: 'text' | 'link';
}

export interface TextRun extends BaseRun {
  type: 'text';
  text: string;
}

export interface LinkRun extends BaseRun {
  type: 'link';
  text: string;
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
}
