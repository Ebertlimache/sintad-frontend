import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:8080/auth';

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<any>{
    const body = {
      email,
      password
    }
    return this.httpClient.post(this.authUrl+'/login',body);
  }

  signup(email: string, password: string, fullname: string): Observable<any>{
    const body = {
      "email": email,
      "password": password,
      "fullName": fullname,
    }
    return this.httpClient.post(this.authUrl+'/signup',body);
  }
  
  logout(): void {
    localStorage.removeItem('token');
  }
}
