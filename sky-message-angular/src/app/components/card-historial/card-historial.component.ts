import { Component, inject, Input, OnInit, signal } from '@angular/core';
import Envio from '../../interfaces/envio';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EnvioService } from '../../services/envio.service';

@Component({
  selector: 'app-card-historial',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './card-historial.component.html',
})
export class CardHistorialComponent implements OnInit {
  isVisible = signal(false);

  @Input() envio!: Envio;

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
