import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountDetails } from '../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  public getAccount(
    accountId: string,
    page: number,
    size: number
  ): Observable<AccountDetails> {
    const params = new HttpParams().set('page', page).set('size', size);

    return this.http.get<AccountDetails>(
      environment.backendUrl + '/accounts/' + accountId + '/history',
      { params }
    );
  }
}
