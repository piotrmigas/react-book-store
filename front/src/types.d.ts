type Book = {
  id: number;
  title: string;
  author: string;
  cover_url: string;
  pages: number;
  price: number;
  currency: string;
  quantity: number;
};

type ResBook = {
  data: Book;
};

type ResBooks = {
  data: Book[];
  metadata: { page: number; records_per_page: number; total_records: number };
};

type Order = {
  id: number;
  quantity: number;
};

type OrderBody = {
  order: Order[];
  first_name: string;
  last_name: string;
  city: string;
  zip_code: string;
};
