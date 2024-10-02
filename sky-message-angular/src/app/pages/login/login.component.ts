import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  authService = inject(AuthService);
  isLoading = false;
  error?: any;
  async login() {
    try {
      this.isLoading = true;
      const d = await this.authService.login('joeljo', '12343');
      console.log(d);
    } catch (error) {
      this.error = error;
    } finally {
      this.isLoading = false;
    }
  }
}
