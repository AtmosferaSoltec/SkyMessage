import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = `${environment.baseUrl}/api/auth`;
  private readonly http = inject(HttpClient);

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async login(user: string, password: string) {
    try {
      await this.delay(1000);
      const response = await lastValueFrom(
        this.http.post(`${this.baseUrl}/login`, { user, password })
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}
