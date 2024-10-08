import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './icon-button.component.html'
})
export class IconButtonComponent {

  @Input() icon!: string
}
