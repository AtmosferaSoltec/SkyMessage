import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  menuList = [
    {
      icon: 'outgoing_mail',
      name: 'Enviar Mensajes',
      link: '/menu/enviar-mensajes',
      detail:
        'Selecciona un archivo xlxs para extraer los datos y enviar mensajes.',
    },
    {
      icon: 'update',
      name: 'Historial',
      link: '/menu/historial',
      detail:
        'Revisa el historial de mensajes enviados como mensaje previo al reparto',
    },
    {
      icon: 'cable',
      name: 'Instancia',
      link: '/menu/instancia',
      detail: 'Conecta y desconecta la instancia (Recomendado mantener activo)',
    },
  ];
}
