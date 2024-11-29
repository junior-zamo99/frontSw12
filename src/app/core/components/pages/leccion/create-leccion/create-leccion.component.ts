import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { NivelService } from '../../../../services/nivel.service';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

import { FileUploadModule } from 'primeng/fileupload';
import { LeccionService } from '../../../../services/leccion.service';

@Component({
  selector: 'app-create-leccion',
  standalone: true,
  imports: [
    FormsModule,
		DialogModule,
		CalendarModule,
		DropdownModule,
		InputNumberModule,
		InputTextareaModule,
		RadioButtonModule,
		InputTextModule,
		RatingModule,
		InputSwitchModule,
		SelectButtonModule,
		ButtonModule,
		CommonModule,
		TableModule,
		FileUploadModule
  ],
  templateUrl: './create-leccion.component.html',
  styleUrl: './create-leccion.component.css'
})
export class CreateLeccionComponent {
	public ejerciciomodal: boolean = false;
	public ejerciciomodalaudio: boolean = false;
	public niveles:Array<any> = [];
	public nivelSeleccionado:any = {};
	public leccion:any = {
		nombre: '',
		descripcion: '',
	};
	public submitted: boolean = false;
	public ejercicio:any = {};
	public ejercicios:Array<any> = [];
	public dificultad:Array<any> = [];
	public ejercicioSeleccionado:any = {};
	public leccionCreada:any = {};

	public token:any = localStorage.getItem('token');

	selectedFile: File | null = null; // Archivo seleccionado
	audioPreview: string | null = null; // Vista previa del audio

	public ejerciciomodalseleccion: boolean = false;
	public ejerciciomodalfalsoverdadero: boolean = false;
	public opcion_1:string = '';
	public opcion_2:string = '';
	public opcion_3:string = '';
	public opcion_4:string = '';
	public opciones:Array<any> = [];

	constructor(
		private _nivelService: NivelService,
		private _leccionService: LeccionService
	) { }


	onFileSelect(event: any): void {
		const file = event.target.files[0];
		
	
		// Validar el tipo de archivo
		const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3'];
		if (!allowedTypes.includes(file.type)) {
		  this.selectedFile = null;
		  return;
		}
	
		this.selectedFile = file;
		this.generateAudioPreview(file);
	}
	
	  // Generar una vista previa del archivo de audio
	  generateAudioPreview(file: File): void {
		const reader = new FileReader();
		reader.onload = () => {
		  this.audioPreview = reader.result as string; // URL para previsualizar
		};
		reader.readAsDataURL(file); // Leer archivo como URL base64
	  }
	
	  // Procesar el archivo localmente
	  processFile(): void {
		
		console.log('Información del archivo:', this.selectedFile);
		
	}


	ngOnInit() {
		this.initData();
		this.dificultad = [
			{label: 'Fácil', value: 'easy'},
			{label: 'Intermedio', value: 'medium'},
			{label: 'Difícil', value: 'hard'}
		];
	}

	initData() {
		this._nivelService.getNiveles(this.token).subscribe(
			response => {
				this.niveles = response;
			},
			error => {
				console.log(error);
			}
		);
	}
	
	crear(){
		this.leccion.nivel_id = this.nivelSeleccionado.id;
		console.log(this.leccion);
		this._leccionService.createLeccion(this.leccion).subscribe(
			response => {
				this.leccionCreada = response;
				this.submitted = true;
				if(this.ejercicios.length >0){
					for(let ejercicio of this.ejercicios){

						ejercicio.leccion_id = this.leccionCreada.id;
						
						const formData = new FormData();
						formData.append('leccion_id', ejercicio.leccion_id);
						if (ejercicio.pregunta_audio) {
							formData.append('pregunta_audio', ejercicio.pregunta_audio);
						}
						if (ejercicio.opciones) {
							formData.append('opciones[]',ejercicio.opciones);
						}
						if (ejercicio.respuesta_texto) {
							formData.append('respuesta_texto', ejercicio.respuesta_texto);
						}
						if (ejercicio.pregunta_texto) {
							formData.append('pregunta_texto', ejercicio.pregunta_texto);
						}
						if (ejercicio.tipo) {
							formData.append('tipo', ejercicio.tipo);
						}
						if (ejercicio.dificultad) {
							formData.append('dificultad', ejercicio.dificultad);
						}
						console.log(formData)
						console.log(ejercicio);
						
					
						
	
						

						this._leccionService.createEjercicio(formData,this.token).subscribe(
							response => {
								console.log(response);
							},
							error => {
								console.log(error);
							}
						);
					}
				}
			},
			error => {
				console.log(error);
			}
		);

	}

	openNew() {
        this.ejercicio = {};
        this.submitted = false;
        this.ejerciciomodal = true;
    }

	hideDialog() {
        this.ejerciciomodal = false;
        this.submitted = false;
    }

	openModalAudio() {
        this.ejercicio = {};
        this.submitted = false;
        this.ejerciciomodalaudio = true;
    }

	ocultarModalAudio() {
        this.ejerciciomodalaudio = false;
        this.submitted = false;
    }

	nuevoEjercicio(){
		this.ejercicio.tipo=1;
		this.ejercicio.dificultad = this.ejercicioSeleccionado.value;
		this.ejercicios.push(this.ejercicio);
		this.hideDialog()
	}

	nuevoEjercicioAudio(){
		this.ejercicio.tipo=2;
		this.ejercicio.dificultad = this.ejercicioSeleccionado.value;
		
		this.ejercicio.pregunta_texto = this.selectedFile ? this.selectedFile.name : '';
		console.log(this.ejercicio);
		this.ejercicios.push(this.ejercicio);
		this.hideDialog()
	}

	nuevoEjercicioSeleccion(){
		this.ejercicio.tipo=3;
		this.opciones.push(this.opcion_1);
		this.opciones.push(this.opcion_2);
		this.opciones.push(this.opcion_3);
		this.opciones.push(this.opcion_4);
		console.log(this.opciones);
		this.ejercicio.opciones = this.opciones;
		this.ejercicio.dificultad = this.ejercicioSeleccionado.value;
		console.log(this.ejercicio);
		this.ejercicios.push(this.ejercicio);

		this.ocultarModalSeleccion()
	}
	
	nuevoEjercicioFalsoVerdadero(){
		this.ejercicio.tipo=4;
		this.ejercicio.dificultad = this.ejercicioSeleccionado.value;
		this.ejercicios.push(this.ejercicio);
		this.ocultarModalFalsoVerdadero()
	}


	deleteEjercicio(ejercicio:any){
		this.ejercicios = this.ejercicios.filter(e => e != ejercicio);
	}

	onUpload(event: { files: any; }) {
		console.log(event);
		for(let file of event.files) {
			this.ejercicio.audio = file;
			console.log(this.ejercicio);
		}	
	}


	openModalSeleccion() {
        this.ejercicio = {};
        this.submitted = false;
        this.ejerciciomodalseleccion = true;
    }

	

	ocultarModalSeleccion() {
        this.ejerciciomodalseleccion = false;
        this.submitted = false;
    }

	openModalFalsoVerdadero() {
        this.ejercicio = {};
        this.submitted = false;
        this.ejerciciomodalfalsoverdadero = true;
    }

	

	ocultarModalFalsoVerdadero() {
        this.ejerciciomodalfalsoverdadero = false;
        this.submitted = false;
    }


	
	

}	
