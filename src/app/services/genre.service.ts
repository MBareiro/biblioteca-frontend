import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Genre } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private baseUrl = `${environment.apiUrl}/genres`;

  constructor(private httpClient: HttpClient) {}

  getGenres(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}`);
  }

  addGenre(genre: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}`, genre);
  }

  deleteGenre(id: number): Observable<void> {
    const deleteUrl = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<void>(deleteUrl);
  }

  updateGenre(genre: Genre): Observable<Genre> {
    const updateUrl = `${this.baseUrl}/${genre.id}`;
    return this.httpClient.put<Genre>(updateUrl, genre);
  }
}
