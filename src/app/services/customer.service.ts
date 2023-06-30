import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { environment } from 'src/environments/environment.development';
import { CustomerDetails } from '../models/customer-details.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  public getCustomers(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(
      environment.backendUrl + '/customers'
    );
  }

  public getCustomer(customerId: number): Observable<Customer> {
    return this.http.get<Customer>(
      environment.backendUrl + '/customers/' + customerId
    );
  }

  public deleteCustomer(customerId: number): Observable<any> {
    return this.http.delete(
      environment.backendUrl + '/customers/delete/' + customerId
    );
  }

  public saveCustomer(customer: Customer): Observable<Customer> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    if(customer.id !== undefined && customer.id !== null)
      return this.http.put<Customer>(
        environment.backendUrl + '/customers/save/' + customer.id,
        customer,
        { headers }
      );
    return this.http.post<Customer>(
      environment.backendUrl + '/customers/save',
      customer,
      { headers }
    );
  }

  public searchCustomers(
    keyword: string,
    option: string
  ): Observable<Array<Customer>> {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('option', option);
    return this.http.get<Array<Customer>>(
      environment.backendUrl + '/customers/search',
      { params }
    );
  }

  public getCustomerDetails(accountId: string): Observable<CustomerDetails> {
    return this.http.get<CustomerDetails>(
      environment.backendUrl + '/customers/details/' + accountId
    );
  }
}
