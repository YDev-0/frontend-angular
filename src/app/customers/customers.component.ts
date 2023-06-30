import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';
import { Observable, catchError, throwError, map } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  customers: Observable<Array<Customer>> | undefined;
  errorMessage: string | undefined;
  searchFormGroup!: FormGroup | undefined;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(''),
      option: this.fb.control(''),
    });

    this.loadCustomers();
  }

  handleSearchCustomers() {
    let keyword = this.searchFormGroup?.value.keyword;
    let option = this.searchFormGroup?.value.option;

    this.customers = this.customerService.searchCustomers(keyword, option).pipe(
      catchError((error) => {
        this.errorMessage = error.message;
        return throwError(() => new Error(error));
      })
    );
  }

  loadCustomers() {
    this.customers = this.customerService.getCustomers().pipe(
      catchError((error) => {
        this.errorMessage = error.message;
        return throwError(() => new Error(error));
      })
    );
  }

  handleDeleteCustomer(customerId: number) {
    const conf = confirm('Are you sure?');
    if (!conf) return;
    this.customerService.deleteCustomer(customerId).subscribe({
      next: (resp) => {
        this.customers = this.customers?.pipe(
          map((data) => {
            return data.filter((customer) => customer.id !== customerId);
          })
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
