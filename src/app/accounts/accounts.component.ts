import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Observable, catchError, throwError } from 'rxjs';
import { AccountDetails } from '../models/account.model';
import { OperationService } from '../services/operation.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  accountFormGroup!: FormGroup;
  currentPage: number = 1;
  pageSize: number = 5;
  accountDetails!: Observable<AccountDetails>;
  operationFormGroup!: FormGroup;
  errorAccount!: any;
  errorOperation!: any;
  accountLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private accountSevice: AccountService,
    private operationService: OperationService
  ) {}

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control(''),
    });

    this.operationFormGroup = this.fb.group({
      operationType: this.fb.control(null, [Validators.required]),
      amount: this.fb.control(0, [Validators.required, Validators.min(2)]),
      description: this.fb.control(''),
      accountDest: this.fb.control(null, [Validators.required]),
    });
  }

  handleSearchAccount() {
    this.accountLoading = true;
    this.errorAccount = null;
    const accountId = this.accountFormGroup.value.accountId;
    this.accountDetails = this.accountSevice
      .getAccount(accountId, this.currentPage, this.pageSize)
      .pipe(
        catchError((error) => {
          this.errorAccount = error.message;
          this.accountLoading = false;
          return throwError(error.message);
        })
      );
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }

  handleOperation() {
    const accountId = this.accountFormGroup.value.accountId;
    const operationType = this.operationFormGroup.value.operationType;
    const amount = this.operationFormGroup.value.amount;

    if (operationType === 'transfer') {
      const accountIdDest = this.operationFormGroup.value.accountDest;

      this.operationService
        .transfer(accountId, accountIdDest, amount)
        .subscribe({
          next: (data) => {
            alert('Success transfer');
            this.handleSearchAccount();
            this.operationFormGroup.reset();
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else {
      const description = this.operationFormGroup.value.description;
      this.operationService
        .accountOperation(accountId, amount, description, operationType)
        .subscribe({
          next: (data) => {
            alert('Success operation');
            this.handleSearchAccount();
            this.operationFormGroup.reset();
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
}
