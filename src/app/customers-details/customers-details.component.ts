import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { Observable, catchError, of, throwError } from 'rxjs';
import {
  CurrentAccount,
  CustomerDetails,
  SavingAccount,
} from '../models/customer-details.model';

@Component({
  selector: 'app-customers-details',
  templateUrl: './customers-details.component.html',
  styleUrls: ['./customers-details.component.css'],
})
export class CustomersDetailsComponent implements OnInit {
  customerDetails!: Observable<CustomerDetails>;
  currentAccounts!: Array<CurrentAccount>;
  savingAccounts!: Array<SavingAccount>;
  errorCustomer!: string;
  customerLoading!: boolean;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerLoading = true;
    const accountId = this.route.snapshot.paramMap.get('id');
    if (accountId) {
      this.customerService.getCustomerDetails(accountId).subscribe({
        next: (resp) => {
          this.customerDetails = of(resp);
          this.customerLoading = false;
        },
        error: (error) => {
          this.customerLoading = false;
          this.errorCustomer = error.message;
          return throwError(error.message);
        },
      });
    }
  }
}
