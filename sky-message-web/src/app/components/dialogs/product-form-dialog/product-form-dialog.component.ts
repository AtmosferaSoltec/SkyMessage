import { Component, EventEmitter, inject, Input, Output, signal, Signal } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlantillaService } from '../../../services/plantilla.service';


@Component({
  selector: 'app-product-form-dialog',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './product-form-dialog.component.html'
})
export class ProductFormDialogComponent {

  @Output() onClose = new EventEmitter<void>();

  plantillaService = inject(PlantillaService);

  formGroup = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    cuerpo: new FormControl('', [Validators.required]),
  })

  close(): void {
    this.onClose.emit()
  }

  guardar() {
    if (this.formGroup.invalid) {
      alert('Formulario invalido');
      return;
    }
   const fb = this.formGroup.value;
   this.plantillaService.create(fb).subscribe({
    next: (data: any) => {
      console.log(data);
      this.close();
    },
    error: (error: any) => {
      console.error(error);
    }
   })
  }
}
