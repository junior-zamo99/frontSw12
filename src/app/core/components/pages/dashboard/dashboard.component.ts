import { Component } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { NivelService } from '../../../services/nivel.service';
import { LeccionService } from '../../../services/leccion.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TimelineModule, CardModule, ButtonModule,CommonModule,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 
  public token:any=localStorage.getItem('token');
  public lecciones:Array<any> = [];
  public progreso:Array<any> = [];

  constructor(

    private _nivelService: NivelService,
    private _leccionService: LeccionService,
    private _usuarioService: UsuarioService,
   

  ) {
  }

  ngOnInit() {
    this.cargarLecciones();
    this.leccionesCompletadas();
    
  }


  cargarLecciones(){
    this._leccionService.getLecciones().subscribe((data) => {
      this.lecciones = data.map((event: any) => ({
        ...event,
        completado: '',
        color: '',  
      icono: ''  
      }));;
    });
  }


  leccionesCompletadas(){

    this._usuarioService.obtenerProgreso(this.token).subscribe((data) => {
      this.progreso = data
      console.log(this.progreso)
      for (let i = 0; i < this.lecciones.length; i++) {
        for (let j = 0; j < this.progreso.length; j++) {
          if (this.lecciones[i].id == this.progreso[j].leccion_id) {
            this.lecciones[i].completado = true;
            this.lecciones[i].color = 'green';
            this.lecciones[i].icono = 'pi pi-check';
          }
        }
      }
      

    });

  }

  

}
