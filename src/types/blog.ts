export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  author?: string;
}

export interface BlogTag {
  id: string;
  name: string;
  count: number;
}
