import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { UsuarioService } from '../../../services/usuario.service';
@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [CommonModule,DividerModule,ButtonModule,RouterLink],
  templateUrl: './planes.component.html',
  styleUrl: './planes.component.css'
})
export class PlanesComponent {

   public token = localStorage.getItem('token');
  suscripcion:any = {};
    constructor(
      private _usuarioService:UsuarioService,
    ){}


      suscripcionPremium(){
      this.suscripcion.suscripcion_id = 2;
      console.log(this.suscripcion)
      this._usuarioService.actualizarSuscripcion(this.suscripcion,this.token).subscribe(
        response=>{
          console.log(response)
        },
        error=>{
          console.log(error)
    })}



    
}
