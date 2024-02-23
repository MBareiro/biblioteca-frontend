import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Editorial } from '../models/editorial';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {

  private baseUrl = `${environment.apiUrl}/editorials`;

  constructor(private httpClient: HttpClient) {}

  getEditorials(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}`);
  }

  addEditorial(editorial: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}`, editorial);
  }

  deleteEditorial(id: number): Observable<void> {
    const deleteUrl = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<void>(deleteUrl);
  }

  updateEditorial(editorial: Editorial): Observable<Editorial> {
    const updateUrl = `${this.baseUrl}/${editorial.id}`;
    return this.httpClient.put<Editorial>(updateUrl, editorial);
  }
}
