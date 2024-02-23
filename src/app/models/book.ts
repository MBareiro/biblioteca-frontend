// book.model.ts
export interface Book {
  id: number;
  title: string;
  stock: number;
  available: number;
  genreId: number;
  authorId: number;
  editorialId: number;
}
