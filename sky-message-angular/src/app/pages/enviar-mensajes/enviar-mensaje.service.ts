import { Injectable, signal } from '@angular/core';
import Plantilla from '../../interfaces/plantilla';

@Injectable({
  providedIn: 'root'
})
export class EnviarMensajeService {

  plantilla = signal<Plantilla | null>(null);
  mensaje = signal('');
  imagenUrl = signal<string | null>(null);
  listContactos = signal<any[]>([]);
}
