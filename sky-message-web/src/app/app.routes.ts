import { Routes } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { EnviarMensajesComponent } from './pages/enviar-mensajes/enviar-mensajes.component';
import { InstanciaComponent } from './pages/instancia/instancia.component';
import { HistorialComponent } from './pages/historial/historial.component';

export const routes: Routes = [
  {
    path: 'menu',
    component: MenuComponent,
    children: [
      {
        path: 'enviar-mensajes',
        component: EnviarMensajesComponent,
      },
      {
        path: 'historial',
        component: HistorialComponent,
      },
      {
        path: 'instancia',
        component: InstanciaComponent
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'menu/enviar-mensajes',
  },
];
