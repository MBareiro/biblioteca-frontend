import { Component, EventEmitter, Output } from '@angular/core';
import { Beneficiary } from '../../models/beneficiary';
import { BeneficiariesService } from '../../services/beneficiaries.service';

@Component({
  selector: 'app-beneficiaries-create',
  templateUrl: './beneficiaries-create.component.html',
  styleUrls: ['./beneficiaries-create.component.css']
})
export class BeneficiariesCreateComponent {
  beneficiary: Beneficiary = { id: 0, name: '', last_name: '', phone: '' };

  @Output() addBeneficiary = new EventEmitter<Beneficiary>();
  @Output() cancelAddBeneficiary = new EventEmitter<void>();

  constructor(private beneficiariesService: BeneficiariesService) {}

  saveBeneficiary(): void {
    this.beneficiariesService.addBeneficiary(this.beneficiary)
      .subscribe((newBeneficiary: Beneficiary) => {
        console.log('Beneficiario registrado:', newBeneficiary);
        this.addBeneficiary.emit(newBeneficiary);
      }, (error: any) => {
        console.error('Error al registrar beneficiario:', error);
      });
  }

  cancel(): void {
    this.cancelAddBeneficiary.emit();
  }
}
