export interface Board {
  id: string;
  user: string;
  email: string;
  title: string;
  content: string;
  published: Date;
}

export interface BoardPagination {
  count: number;
  next: string;
  previous: string;
  results: {
    id: string;
    user: string;
    email: string;
    title: string;
    content: string;
    published: Date;
  }
}
