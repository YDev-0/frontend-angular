import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent implements OnInit {
  customerFormGroup: FormGroup | undefined;
  customerId: number | undefined;
  customer: Customer | undefined;
  errorMessage: string | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.customerId = parseInt(idParam, 10);

      if (!isNaN(this.customerId)) {
        this.customerService.getCustomer(this.customerId).subscribe({
          next: (customer: Customer) => {
            this.customer = customer;
            this.initializeForm();
          },
          error: (error: any) => {
            this.errorMessage = error.message;
          },
        });
      } else {
        // Handle invalid customer ID
      }
    } else {
      this.initializeForm();
    }
  }

  initializeForm() {
    this.customerFormGroup = this.fb.group({
      id: this.fb.control(this.customer ? this.customer.id : null),
      name: this.fb.control(this.customer ? this.customer.name : null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: this.fb.control(this.customer ? this.customer.email : null, [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  handleSaveCustomer() {
    const newCustomer = this.customerFormGroup?.value;
    this.customerService.saveCustomer(newCustomer).subscribe({
      next: (data) => {
        alert('customer saved successfully!');
        this.router.navigateByUrl('/customers');
      },
      error: (error) => {
        alert('An error has occured while saving customer!');
        console.log(error);
      },
    });
  }
}
