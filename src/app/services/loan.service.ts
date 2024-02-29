import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Loan } from '../models/loan';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private httpClient: HttpClient) { }

  getLoans(): Observable<Loan[]> {
    return this.httpClient.get<Loan[]>(`${this.baseUrl}/loans`);
  }

  getLoan(id: number): Observable<Loan> {
    return this.httpClient.get<Loan>(`${this.baseUrl}/loans/${id}`);
  }

  createLoan(loan: Loan): Observable<Loan> {
    return this.httpClient.post<Loan>(`${this.baseUrl}/loans`, loan);
  }

  updateLoan(id: number, loan: Loan): Observable<Loan> {
    return this.httpClient.put<Loan>(`${this.baseUrl}/loans/${id}`, loan);
  }

  deleteLoan(id: number): Observable<Loan> {
    return this.httpClient.delete<Loan>(`${this.baseUrl}/loans/${id}`);
  }

  // Método para obtener los préstamos de un beneficiario específico
  getLoansByBeneficiaryId(beneficiaryId: number): Observable<Loan[]> {
    return this.httpClient.get<Loan[]>(`${this.baseUrl}/loans?beneficiaries_id=${beneficiaryId}`);
  }

  cancelLoan(id: number): Observable<Loan> {
    return this.httpClient.put<Loan>(`${this.baseUrl}/loan-cancel/${id}`, { returned: true });
  }

  // Método para verificar si un beneficiario tiene libros pendientes por devolver
  checkBooksPending(beneficiaryId: number): Observable<boolean> {
    // Realizar una solicitud al backend para verificar si hay libros pendientes
    return this.getLoansByBeneficiaryId(beneficiaryId).pipe(
      map((loans: Loan[]) => {
        // Verificar si hay al menos un préstamo con una fecha de retorno en el futuro
        return loans.some(loan => new Date(loan.return_date) > new Date());
      })
    );
  }

  checkLoans(beneficiaryId: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/loans/check?beneficiaryId=${beneficiaryId}`);
  }
}
