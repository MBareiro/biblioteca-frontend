// author.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author } from '../models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private baseUrl = `${environment.apiUrl}/authors`;

  constructor(private httpClient: HttpClient) {}

  getAuthors(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}`);
  }

  addAuthor(author: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}`, author);
  }

  deleteAuthor(id: number): Observable<void> {
    const deleteUrl = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<void>(deleteUrl);
  }

  updateAuthor(author: Author): Observable<Author> {
    const updateUrl = `${this.baseUrl}/${author.id}`;
    return this.httpClient.put<Author>(updateUrl, author);
  }
}
