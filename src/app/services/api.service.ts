import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = environment.url;

  constructor(private http: HttpClient) {}

  postRegister(data: any): Observable<any> {
    const url = this.url + '/api/register';
    return this.http.post(url, data);
  }

  postLogin(data: any): Observable<any> {
    const url = this.url + '/api/login';
    return this.http.post(url, data);
  }

  /////////////////////////////////////////////////////////////////

  postAddAccount(data: any): Observable<any> {
    const url = this.url + '/api/post_add_accounts';
    return this.http.post(url, data);
  }

  getAccountsByUser(data: any): Observable<any> {
    const url = this.url + '/api/get_accounts_by_user';
    return this.http.post(url, data);
  }

  postEditAccount(data: any): Observable<any> {
    const url = this.url + '/api/post_edit_account';
    return this.http.post(url, data);
  }

  /////////////////////////////////////////////////////////////////

  postAddTransactions(data: any): Observable<any> {
    const url = this.url + '/api/post_add_transaction';
    return this.http.post(url, data);
  }

  getTransactionByUser(data: any): Observable<any> {
    const url = this.url + '/api/get_transactions_by_user';
    return this.http.post(url, data);
  }

  /////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////

  getCategories(): Observable<any> {
    const url = this.url + '/api/get_categories';
    return this.http.get(url);
  }

  /////////////////////////////////////////////////////////////////
}
