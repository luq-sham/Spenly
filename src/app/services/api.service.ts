import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = environment.url

  constructor(
    private http: HttpClient
  ) { }

  postRegister(data: any): Observable<any> {
    const url = this.url + '/api/register'
    return this.http.post(url,data);
  }

  postLogin(data: any): Observable<any> {
    const url = this.url + '/api/login'
    return this.http.post(url,data);
  }
}
