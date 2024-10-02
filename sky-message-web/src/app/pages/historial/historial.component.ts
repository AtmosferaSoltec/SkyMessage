import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import Envio from '../../interfaces/envio';
import { EnvioService } from '../../services/envio.service';
import { CardHistorialComponent } from '../../components/card-historial/card-historial.component';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, CardHistorialComponent],
  templateUrl: './historial.component.html'
})
export class HistorialComponent implements OnInit {
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
