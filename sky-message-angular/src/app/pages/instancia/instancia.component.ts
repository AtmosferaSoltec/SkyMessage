import { Component } from '@angular/core';
import * as QRCode from 'qrcode';
import { trigger } from '@angular/animations';
import { animPrueba } from '../../animations/anim-prueba';
import { fadeInOut } from '../../animations/fade-in-out';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { SecondsPipe } from '../../pipes/seconds.pipe';

@Component({
  selector: 'app-instancia',
  standalone: true,
  imports: [CommonModule, ButtonComponent, MatIconModule, SecondsPipe],
  templateUrl: './instancia.component.html',
  animations: [
    trigger('fadeInOut', fadeInOut()),
    trigger('prueba', animPrueba()),
  ],
})
export class InstanciaComponent {
  isLoading = false;
  imageQR?: string;

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async generarQR() {
    try {
      this.isLoading = true;
      await this.delay(2000);
      QRCode.toDataURL(
        'Debes Generar el Código QR para poder obtener una instancia activa.'
      ).then((url) => {
        this.imageQR = url;
        this.startTimer();
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  timer: number = 0;
  interval: any;

  startTimer() {
    this.timer = 40;
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.imageQR = undefined;
        clearInterval(this.interval);
      }
    }, 1000);
  }
}
