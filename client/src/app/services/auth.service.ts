import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api/v1/user';

  constructor(private http: HttpClient) {}

  registerUser(userDetails: User) {
    return this.http.post(`${this.baseUrl}/register`, userDetails);
  }

  loginUser(userDetails: User) {
    return this.http.post(`${this.baseUrl}/login`, userDetails);
  }
  getUserByID(userId: string) {
    return this.http.get(`${this.baseUrl}/${userId.slice(1,-1)}`);
  }
}
