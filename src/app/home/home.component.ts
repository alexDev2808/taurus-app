import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonModule,
    SharedModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
