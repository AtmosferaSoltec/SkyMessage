import { Routes } from "@angular/router";
import { EnviarMensajesComponent } from "../enviar-mensajes/enviar-mensajes.component";
import { HistorialComponent } from "../historial/historial.component";
import { InstanciaComponent } from "../instancia/instancia.component";
import { PanelAdminComponent } from "../panel-admin/panel-admin.component";

export const menuRoutes: Routes = [
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
      component: InstanciaComponent,
    },
    {
      path: 'panel-admin',
      component: PanelAdminComponent
    }
  ];