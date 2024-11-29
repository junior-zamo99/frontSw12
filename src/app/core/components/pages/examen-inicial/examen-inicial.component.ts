import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ExamenIaService } from '../../../services/examen-ia.service';
import { lastValueFrom } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NivelService } from '../../../services/nivel.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ProgresoService } from '../../../services/progreso.service';

interface Question {
  question: string;
  answer: string;
}


@Component({
  selector: 'app-examen-inicial',
  standalone: true,
  imports: [CardModule,DialogModule,ButtonModule,CommonModule,ProgressSpinnerModule,InputTextModule,FormsModule,RadioButtonModule,CheckboxModule],
  templateUrl: './examen-inicial.component.html',
  styleUrl: './examen-inicial.component.css'
})
export class ExamenInicialComponent {
  public token = localStorage.getItem('token');
  public examen:any;
  public preguntas:Array<any> = [];
  public cargarDatos:boolean = false;
  public respuesta: { questions: Question[] } = {
    questions: []
  };

  public nivel:any={}

  answer:string = '';
  public respuestas: { [key: string]: string } = {};

  public mostrarModal: boolean = false;

  public nuevoNivel:any = {
    nivel_actual_id:''
  }

  public id=localStorage.getItem('user')
  public estudiante:any={}
  public niveles:Array<any> = []
  public nivelActual:any={}
  constructor(
    private _examenIaService:ExamenIaService,
    private _router:Router,
    private toastr:ToastrService,
    private _nivelService: NivelService,
    private _usuarioService: UsuarioService,
    private _progresoService: ProgresoService
  ) { }

  ngOnInit(): void {
    this.initData();
    this.cargarNiveles()
  }
   
      

  async initData() {
    try {
      const response = await lastValueFrom(this._examenIaService.getExamenIa());
      this.examen = response.data;
      this.preguntas = this.examen.questions;
      this.cargarDatos = true;
    } catch (error) {
      console.log(error);
    }
  }

  async enviarRespuestas() {
    try {
      console.log('Enviando respuestas:', this.respuesta);
  
      // Llama al servicio para enviar las respuestas al backend
      const response = await lastValueFrom(this._examenIaService.enviarExamenIa(this.respuesta));

      this.nivel = response.data
      console.log(this.nivel)
      this.openModal()
    } catch (error) {
      console.error('Error al enviar las respuestas:', error);
    }
  }
  


  addQuestion(newQuestion: string) {
  
    if (this.respuesta.questions.find(q => q.question === newQuestion)) {
      this.toastr.error('La pregunta ya ha sido respondida.');
      return;
    }
  
    
    const answer = this.respuestas[newQuestion];
    if (answer) {
      this.respuesta.questions.push({ question: newQuestion, answer });
      // Limpiar la respuesta asociada a la pregunta
      
    } else {
      console.warn('No hay respuesta para agregar.');
    }
  
    console.log('Respuestas actuales:', this.respuesta.questions);
  }


  removeQuestion(index: number) {
    if (index >= 0 && index < this.respuesta.questions.length) {
      const removedQuestion = this.respuesta.questions[index].question;
  
      // Eliminar de la lista de respuestas
      this.respuesta.questions.splice(index, 1);
  
      // Eliminar cualquier referencia en el objeto respuestas (si aplica)
      if (this.respuestas[removedQuestion]) {
        delete this.respuestas[removedQuestion];
      }
  
      console.log('Pregunta eliminada:', removedQuestion);
      console.log('Respuestas actuales:', this.respuesta.questions);
    } else {
      console.error('El índice proporcionado no es válido.');
    }
  }

  ocultarModal(){
    this.mostrarModal = false;
    window.location.reload()
  }

  openModal(){
    this.mostrarModal = true;
    ;
  }

  actualizarNivel(){
    if(this.nivel.nivel=="A1"){
      this.nuevoNivel.nivel_actual_id = 1;
    }else if(this.nivel.nivel=="A2"){
      this.nuevoNivel.nivel_actual_id = 2;
    }else if(this.nivel.nivel=="B1"){
      this.nuevoNivel.nivel_actual_id = 3;
    }else if(this.nivel.nivel=="B2"){
      this.nuevoNivel.nivel_actual_id = 4;
    }else if(this.nivel.nivel=="C1"){
      this.nuevoNivel.nivel_actual_id = 5;
    }else if(this.nivel.nivel=="C2"){
      this.nuevoNivel.nivel_actual_id = 6;
    }

    this._examenIaService.actualizarNivel(this.nuevoNivel,this.token).subscribe(
      (response:any)=>{
        console.log(response)
        this.obtenerEstudiante()
        this.toastr.success('Nivel actualizado correctamente')
        this._router.navigate(['/nivel-estudiante'])
      },
      (error)=>{
        console.log(error)
      })
  }

  marcarNiveles(){
    const data={}
    console.log(this.nivelActual.id)
    for (let i = 0; i < this.nivelActual.id-1; i++) {
      console.log(this.niveles) 
      const id=this.niveles[i].id

        this._progresoService.marcarNivelComoCompletado(id,data,this.token).subscribe(
          (response: any) => {
            console.log(response);
          },
          (error:any) => {
            console.error('Error al marcar nivel:', error);
          }
        );
    }
  }

  obtenerEstudiante(){
    this._usuarioService.obtenerEstudiante(this.id,this.token).subscribe(
      (response: any) => {
        this.estudiante = response.estudiante;
        this.nivelActual = this.estudiante.nivel_actual;
        this.marcarNiveles()
      },
      (error) => {
        console.error('Error al obtener estudiante:', error);
      }
    );
}


  cargarNiveles(){
    if (this.token) {
      this._nivelService.getNiveles(this.token).subscribe(
        (response: any[]) => {
          this.niveles = response.map((nivel) => {
            return {
              ...nivel,
              completado: ''
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
}
