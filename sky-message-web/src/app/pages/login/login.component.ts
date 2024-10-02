import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './login.component.html',
  styles: `
  `,
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
      this.error = error
    } finally {
      this.isLoading = false;
    }
  }
}
