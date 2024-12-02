import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

import { Router, RouterLink } from '@angular/router';
import { LayoutService } from '../../../../layout/service/app.layout.service';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ ButtonModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    DropdownModule,
  RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  public name = '';
  public email = '';
  public password = '';
  public telefono : number=0;
  public sexo = '';

  sexoOptions = [
    { label: 'Masculino', value: 'm' },
    { label: 'Femenino', value: 'f' },
    { label: 'Otros', value: 'o' }
  ];



  constructor(public layoutService: LayoutService,
    private authService:AuthService,
    private router:Router,
    private toastr:ToastrService

  ) { }

  
  registrar(): void {
    this.authService.registrar({name: this.name, email: this.email, password: this.password, telefono: this.telefono, sexo: this.sexo})
    .subscribe( (res) => {
      console.log(res);
      localStorage.setItem('token', res.accessToken);
      localStorage.setItem('user', res.user_id);
      localStorage.setItem('rol', "estudiante");
      this.router.navigate(['/pregunta_examen']);
      this.toastr.success('Registro exitoso');
    },
    (err) => {
      console.log(err);
      this.toastr.error('Error al registrar');
    }
  )
  }




}
