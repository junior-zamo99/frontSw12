import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { NivelService } from '../../../services/nivel.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ProgresoService } from '../../../services/progreso.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-estudiante-nivel',
  standalone: true,
  imports: [DataViewModule,CommonModule,ButtonModule,TagModule,RouterLink],
  templateUrl: './estudiante-nivel.component.html',
  styleUrl: './estudiante-nivel.component.css'
})
export class EstudianteNivelComponent {
  public id=localStorage.getItem('user')
  public estudiante:any={}
  public niveles:Array<any> = []
  public token = localStorage.getItem('token')
  public nivelActual:any={}
  constructor(
    private _nivelService: NivelService,
    private _usuarioService: UsuarioService,
    
  ) {}

  ngOnInit(){
    this.init_data()   
     this.obtenerEstudiante()
  } 

  init_data() {
    if (this.token) {
      this._nivelService.getNiveles(this.token).subscribe(
        (response: any[]) => {
          this.niveles = response.map((nivel) => {
            return {
              ...nivel,
              completado: false,
            };
          });
  
         
        },
        (error) => {
          console.error('Error al obtener niveles:', error);
        }
      );
    } else {
      console.error('Token is null');
    }
  }

  obtenerEstudiante(){
      this._usuarioService.obtenerEstudiante(this.id,this.token).subscribe(
        (response: any) => {
          this.estudiante = response.estudiante;
          this.nivelActual = this.estudiante.nivel_actual;
          console.log(this.nivelActual)
        },
        (error) => {
          console.error('Error al obtener estudiante:', error);
        }
      );
  }

  

  
  
}
