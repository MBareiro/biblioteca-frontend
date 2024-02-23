import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beneficiary } from '../models/beneficiary';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BeneficiariesService {
  private baseUrl = `${environment.apiUrl}/beneficiaries`;

  constructor(private httpClient: HttpClient) {}

  addBeneficiary(beneficiary: Beneficiary): Observable<Beneficiary> {
    return this.httpClient.post<Beneficiary>(this.baseUrl, beneficiary);
  }

  getBeneficiaries(): Observable<Beneficiary[]> {
    return this.httpClient.get<Beneficiary[]>(this.baseUrl);
  }

  deleteBeneficiary(id: number): Observable<void> {
    const deleteUrl = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<void>(deleteUrl);
  }

  updateBeneficiary(beneficiary: Beneficiary): Observable<Beneficiary> {
    const updateUrl = `${this.baseUrl}/${beneficiary.id}`;
    return this.httpClient.put<Beneficiary>(updateUrl, beneficiary);
  }
}
