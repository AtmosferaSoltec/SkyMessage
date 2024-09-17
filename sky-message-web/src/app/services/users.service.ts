import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly baseUrl = `${environment.baseUrl}/api/usuario`;
  private readonly http = inject(HttpClient);

  getUsers() {
    return this.http.post(this.baseUrl, {});
  }
}
