import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private baseUrl = `${environment.apiUrl}/books`;

  constructor(private httpClient: HttpClient) {}

  addBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(this.baseUrl, book);
  }

  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.baseUrl);
  }

  updateBook(book: Book): Observable<Book> {
    const updateUrl = `${this.baseUrl}/${book.id}`;
    return this.httpClient.put<Book>(updateUrl, book);
  }

  deleteBook(id: number): Observable<void> {
    const deleteUrl = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<void>(deleteUrl);
  }
}
