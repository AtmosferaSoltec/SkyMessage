import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EnvioService {
  private readonly baseUrl = `${environment.baseUrl}/api/envio`;
  private readonly http = inject(HttpClient);

  getAll() {
    return this.http.get(this.baseUrl);
  }
}
