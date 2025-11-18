import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  login(param: any): Observable<any> {
    const url = this.apiUrl + 'api/login'
    return this.http.post(url, param)
  }

  register(param: any): Observable<any> {
    const url = this.apiUrl + 'api/register'
    return this.http.post(url, param)
  }

  logout(param: any): Observable<any> {
    const url = this.apiUrl + 'api/logout'
    return this.http.post(url, param)
  }

  postAddAccount(param: any): Observable<any> {
    const url = this.apiUrl + 'api/post_add_account'
    return this.http.post(url, param)
  }

  getAccounts(body: any): Observable<any> {
    const url = this.apiUrl + 'api/get_account?user=' + body.user_id
    return this.http.get(url)
  }

  getCategories(): Observable<any> {
    const url = this.apiUrl + 'api/get_categories'
    return this.http.get(url)
  }
}
