import { Component, inject, OnInit, signal } from '@angular/core';
import Envio from '../../interfaces/envio';
import { EnvioService } from '../../services/envio.service';
import { CardHistorialComponent } from '../../components/card-historial/card-historial.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, CardHistorialComponent],
  templateUrl: './historial.component.html',
})
export class HistorialComponent implements OnInit {
  envioService = inject(EnvioService);
  listEnvios = signal<Envio[]>([]);

  ngOnInit(): void {
    this.envioService.getAll().subscribe({
      next: (data: any) => {
        console.log(data);
        
        this.listEnvios.set(data);
      },
    });
  }
}
