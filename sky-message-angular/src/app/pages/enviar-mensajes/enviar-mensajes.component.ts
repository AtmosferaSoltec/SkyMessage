import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ButtonComponent } from '../../components/button/button.component';
import Plantilla from '../../interfaces/plantilla';
import * as xls from 'xlsx';
import { PlantillaService } from '../../services/plantilla.service';
import { ProductFormDialogComponent } from '../../components/dialogs/product-form-dialog/product-form-dialog.component';

@Component({
  selector: 'app-enviar-mensajes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    ButtonComponent,
    ProductFormDialogComponent,
  ],
  templateUrl: './enviar-mensajes.component.html',
})
export class EnviarMensajesComponent implements OnInit {
  listPlantillas = signal<Plantilla[]>([]);
  plantilla: Plantilla | null = null;

  isVisible = signal(false);

  setPlantilla() {
    this.mensaje = this.plantilla?.cuerpo || '';
  }
  removePlantilla() {
    this.plantilla = null;
    this.mensaje = '';
  }
  ngOnInit(): void {
    this.plantillaService.getAll().subscribe({
      next: (data) => {
        this.listPlantillas.set(data);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  mensaje =
    'Buen día estimado @Cliente! Su encomienda ya se encuentra en la agencia Shalom de Chincha. Horario de Atención: Lunes a Viernes de 8 am a 6 pm y Sábados de 8 am a 6 pm Si desea programar el servicio de reparto bríndeme lo siguiente: Número de DNIDirección y ReferenciaTelf: +51966558458 / +51985478596';

  plantillaService = inject(PlantillaService);

  archivo = signal<File | null>(null);

  getImg(file: File) {
    URL.createObjectURL(file);
  }

  listUsuarios = signal<any[]>([]);
  imagen = signal<File | null>(null);

  onImgSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.imagen.set(file);
    }
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.archivo.set(file);
      this.leerExcel(file);
    }
  }

  removeFile() {
    this.archivo.set(null);
  }

  leerExcel(file: File) {
    let fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.onload = (e) => {
      const data = new Uint8Array(fr.result as ArrayBuffer);
      const workBook = xls.read(data, { type: 'array' });
      const sheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[sheetName];
      const excelData: any[] = xls.utils.sheet_to_json(workSheet);
      const listExcel = excelData.map((item: any) => {
        const miembro = {
          nombre: item.Nombre,
          celular: item.Celular,
        };
        return miembro;
      });
      this.listUsuarios.set(listExcel);
    };
  }
  
}
