import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountOperation } from '../models/account.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class OperationService {
  constructor(private http: HttpClient) {}

  public accountOperation(
    accountId: string,
    amount: number,
    description: string,
    type: string,
  ): Observable<AccountOperation> {
    let operationObject = {
      amount: amount,
      description: description
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<AccountOperation>(
      environment.backendUrl +
        '/accounts/' +
        accountId +
        '/operation/' +
        type,
      operationObject,
      { headers }
    );
  }

  public transfer(accountIdSrc: string, accountIdDest: string, amount: number) {
    const transferObject = {
      accountIdSrc: accountIdSrc,
      accountIdDest: accountIdDest,
      amount: amount,
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(
      environment.backendUrl + '/accounts/transfer',
      transferObject,
      { headers }
    );
  }
}
