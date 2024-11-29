import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-pregunta-examen',
  standalone: true,
  imports: [CommonModule,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './pregunta-examen.component.html',
  styleUrl: './pregunta-examen.component.css'
})
export class PreguntaExamenComponent {

}
