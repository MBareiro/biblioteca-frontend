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

  getBookTitles(): Observable<string[]> {
    const titlesUrl = `${this.baseUrl}/titles`;
    return this.httpClient.get<string[]>(titlesUrl);
  }

  // Método para verificar si un libro ya existe
  checkBookExists(bookData: any): Observable<boolean> {
    const checkUrl = `${this.baseUrl}/exists`;
    return this.httpClient.post<boolean>(checkUrl, bookData);
  }
  
  getBooksByAuthorId(authorId: number): Observable<any[]> {
    const booksByAuthorUrl = `${this.baseUrl}/author/${authorId}`;
    return this.httpClient.get<any[]>(booksByAuthorUrl);
  }

  getBooksByGenreId(genreId: number): Observable<any[]> {
    const booksByGenreUrl = `${this.baseUrl}/genre/${genreId}`;
    return this.httpClient.get<any[]>(booksByGenreUrl);
  }

  getBooksByEditorialId(editorialId: number): Observable<any[]> {
    const booksByEditorialUrl = `${this.baseUrl}/editorial/${editorialId}`;
    return this.httpClient.get<any[]>(booksByEditorialUrl);
  }

}
