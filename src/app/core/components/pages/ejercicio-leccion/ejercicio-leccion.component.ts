import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { StepperModule } from 'primeng/stepper';
import { TimelineModule } from 'primeng/timeline';
import { LeccionService } from '../../../services/leccion.service';
import { ActivatedRoute } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-ejercicio-leccion',
  standalone: true,
  imports: [TimelineModule, CardModule, ButtonModule,CommonModule,InputTextModule,CheckboxModule,FormsModule],
  templateUrl: './ejercicio-leccion.component.html',
  styleUrl: './ejercicio-leccion.component.css',
  
})
export class EjercicioLeccionComponent {
  public id:any
  public token:any=localStorage.getItem('token');
  public ejercicios:Array<any> = [];
  baseUrl: string = 'http://127.0.0.1:8000/storage/';
  public respuesta:any={}
  constructor(
    private _leccionesService: LeccionService,
    private _route: ActivatedRoute,
  ){}
  
  ngOnInit() { 
    this.id = this._route.snapshot.paramMap.get('id');
    this.cargarEjercicios();
   
  }


  cargarEjercicios(){
    this._leccionesService.obtenerEjercicioLeccion(this.id,this.token).subscribe((data) => {
      this.ejercicios = data.map((event: any) => ({
        ...event,
        respuesta: '',
        color: '',  
      icono: ''  
      }));
      
    });
      
  }
  

  // Método para construir la URL completa del audio
  getAudioUrl(audioPath: string): string {
      return `${this.baseUrl}/${audioPath}`;
  }


  TerminarLeccion(){
    const data={}
    this._leccionesService.leccionCompleta(this.id,data,this.token).subscribe((data) => {
      console.log(data)
    });
  }


  enviarRespuesta(event:any){
     console.log(event) 
    if(event.tipo=="4"){
      this.respuesta.respuesta_usuario=event.respuesta[0]
    }
    else{
      this.respuesta.respuesta_usuario=event.respuesta
    }

    this._leccionesService.enviarRespuesta(event.id,this.respuesta,this.token).subscribe((data) => {
      console.log(data)
      if(data.es_correcto){
        event.color='green'
        event.icono='pi pi-check'
      }else{
        event.color='red'
        event.icono='pi pi-times'
      }

    });

  }
  

}
