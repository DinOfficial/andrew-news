import type { Document } from '@contentful/rich-text-types';

export interface Article {
  id: string;
  category: string;
  title: string;
  author?: string;
  date?: string;
  summary: string;
  content: string | Document;
  imageUrl?: string;
}