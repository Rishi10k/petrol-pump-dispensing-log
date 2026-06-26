import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class DispensingService {
  private apiUrl = 'https://localhost:7068/api/dispensing';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  }

  getRecords(filters?: any) {
    let params = new HttpParams();
    if (filters?.dispenserNo) params = params.set('dispenserNo', filters.dispenserNo);
    if (filters?.paymentMode) params = params.set('paymentMode', filters.paymentMode);
    if (filters?.startDate) params = params.set('startDate', filters.startDate);
    if (filters?.endDate) params = params.set('endDate', filters.endDate);

    return this.http.get<any[]>(this.apiUrl, {
      headers: this.getHeaders(),
      params
    });
  }

  createRecord(formData: FormData) {
    return this.http.post(this.apiUrl, formData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authService.getToken()}`
      })
    });
  }

  getProofUrl(fileName: string): string {
    return `${this.apiUrl}/proof/${fileName}`;
  }
}