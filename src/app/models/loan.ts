// models/loan.ts
export interface Loan {
  id: number;
  loan_date: Date;
  return_date: Date;
  returned: boolean;
  beneficiaries_id: number;
  books_id: number;
}
