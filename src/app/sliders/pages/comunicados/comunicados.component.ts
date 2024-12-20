import { Component } from '@angular/core';
import { CarruselComponent } from '../../components/carrusel/carrusel.component';

@Component({
  selector: 'app-comunicados',
  standalone: true,
  imports: [
    CarruselComponent
  ],
  templateUrl: './comunicados.component.html',
  styleUrl: './comunicados.component.scss'
})
export class ComunicadosComponent {

}
