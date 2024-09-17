import { trigger } from '@angular/animations';
import { Component, inject, OnInit } from '@angular/core';
import { fadeInOut } from '../../animations/fade-in-out';
import { animPrueba } from '../../animations/anim-prueba';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-instancia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instancia.component.html',
  styleUrl: './instancia.component.scss',
  animations: [
    trigger('fadeInOut', fadeInOut()),
    trigger('prueba', animPrueba()),
  ],
})
export class InstanciaComponent implements OnInit {
  userServices = inject(UsersService);
  list: any[] = [];
  constructor() {
    this.userServices.getUsers().subscribe({
      next: (data: any) => {
        this.list = data;
      },
    });
  }
  ngOnInit(): void {
    this.generarQR();
  }

  showText = false;

  toggleText() {
    this.showText = !this.showText;
  }

  imageQR = '';

  generarQR() {
    QRCode.toDataURL('asdasdasasdasdasddad').then((url) => {
      this.imageQR = url;
    });
  }
}
