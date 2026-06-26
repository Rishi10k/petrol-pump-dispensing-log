import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DispensingService } from '../../services/dispensing';

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './entry.html',
  styleUrl: './entry.scss'
})
export class Entry {
  dispenserNo = '';
  quantity: number | null = null;
  vehicleNumber = '';
  paymentMode = '';
  paymentProof: File | null = null;
  isLoading = false;
  errorMessage = '';

  dispensers = ['D-01', 'D-02', 'D-03', 'D-04'];
  paymentModes = ['Cash', 'Credit Card', 'UPI'];

  constructor(
    private dispensingService: DispensingService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) this.paymentProof = file;
  }

  onSubmit() {
    if (!this.dispenserNo || !this.quantity || !this.vehicleNumber || !this.paymentMode) {
      this.errorMessage = 'Please fill in all required fields.';
      this.cdr.detectChanges();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.detectChanges();

    const formData = new FormData();
    formData.append('dispenserNo', this.dispenserNo);
    formData.append('quantity', this.quantity.toString());
    formData.append('vehicleNumber', this.vehicleNumber);
    formData.append('paymentMode', this.paymentMode);
    if (this.paymentProof) formData.append('paymentProof', this.paymentProof);

    this.dispensingService.createRecord(formData).subscribe({
      next: () => this.router.navigate(['/listing']),
      error: () => {
        this.errorMessage = 'Failed to save record. Please try again.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}