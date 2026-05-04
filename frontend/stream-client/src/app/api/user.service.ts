import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private backend = environment.apiUrl;
  createUser(credentials: { email: string; password: string }) {
    return this.http.post(`${this.backend}/user`, credentials);
  }
}
