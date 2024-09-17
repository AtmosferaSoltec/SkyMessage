import { trigger } from '@angular/animations';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { fadeInOut } from '../../animations/fade-in-out';
import { animPrueba } from '../../animations/anim-prueba';
import { slideInOut } from '../../animations/slide-in-out';
import { EnvioService } from '../../services/envio.service';
import Envio from '../../interfaces/envio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-historial',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './card-historial.component.html',
  animations: [
    trigger('fadeInOut', fadeInOut()),
    trigger('prueba', animPrueba()),
    trigger('slideInOut', slideInOut())
  ],
})
export class CardHistorialComponent implements OnInit {

  isVisible = signal(false);
  
  @Input() envio!: Envio

  envioService = inject(EnvioService);
  listEnvios = signal<Envio[]>([]);

  ngOnInit(): void {
    this.envioService.getAll().subscribe({
      next: (data: any) => {
        this.listEnvios.set(data);
      },
    });
  }

}
