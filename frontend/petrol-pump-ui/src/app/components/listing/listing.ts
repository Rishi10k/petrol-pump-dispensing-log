import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DispensingService } from '../../services/dispensing';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './listing.html',
  styleUrl: './listing.scss'
})
export class Listing implements OnInit {
  records: any[] = [];
  isLoading = false;

  filterDispenserNo = '';
  filterPaymentMode = '';
  filterStartDate = '';
  filterEndDate = '';

  dispensers = ['', 'D-01', 'D-02', 'D-03', 'D-04'];
  paymentModes = ['', 'Cash', 'Credit Card', 'UPI'];

  constructor(
    private dispensingService: DispensingService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadRecords();
  }

  loadRecords() {
    this.isLoading = true;
    this.cdr.detectChanges();
    
    const filters = {
      dispenserNo: this.filterDispenserNo || null,
      paymentMode: this.filterPaymentMode || null,
      startDate: this.filterStartDate || null,
      endDate: this.filterEndDate || null
    };

    this.dispensingService.getRecords(filters).subscribe({
      next: (data) => {
        this.records = data ?? [];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading records:', err);
        this.records = [];
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onFilterChange() {
    this.loadRecords();
  }

  clearFilters() {
    this.filterDispenserNo = '';
    this.filterPaymentMode = '';
    this.filterStartDate = '';
    this.filterEndDate = '';
    this.loadRecords();
  }

  getProofUrl(fileName: string): string {
    return this.dispensingService.getProofUrl(fileName);
  }

  logout() {
    this.authService.logout();
  }
}