import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';
import { AccountDetails } from '../models/account.model';
import { Observable, of, throwError } from 'rxjs';

@Component({
  selector: 'app-accounts-details',
  templateUrl: './accounts-details.component.html',
  styleUrls: ['./accounts-details.component.css'],
})
export class AccountsDetailsComponent implements OnInit {
  accountDetails!: Observable<AccountDetails>;
  errorAccount!: any;
  accountLoading!: boolean;
  currentPage: number = 1;
  pageSize: number = 5;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.handleLoadAccount();
  }

  handleLoadAccount() {
    this.accountLoading = true;
    this.errorAccount = null;
    const accountId = this.route.snapshot.paramMap.get('id');
    if(accountId)
      this.accountService
        .getAccount(accountId, this.currentPage, this.pageSize).subscribe({
          next:(resp) => {
            this.accountDetails = of(resp);
            this.accountLoading = false;
          },
          error: (error) => {
            this.errorAccount = error.message;
            this.accountLoading = false;
            return throwError(error.message);
          }
        })
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.handleLoadAccount();
  }
}
