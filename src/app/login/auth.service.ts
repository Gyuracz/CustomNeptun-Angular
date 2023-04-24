import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken(): string {
    return 'secure-token-123';
  }

  isAuthenticated(): boolean {
    return true;
  }
  
}
