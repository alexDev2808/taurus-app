import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '../shared/shared.module';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    SharedModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
