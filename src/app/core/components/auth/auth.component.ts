import { Component } from '@angular/core';
import { LayoutService } from '../../../layout/service/app.layout.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    RouterLink,
    
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  password!: string;
  public email: string = '';

  constructor(public layoutService: LayoutService,
    private authService:AuthService,
    private router:Router,
    private toastr:ToastrService,
    private usuarioService:UsuarioService
   

  ) { }


  login(): void {
    console.log(this.email,this.password)
    this.authService.login({email: this.email, password: this.password}).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('user', res.user.id);
        localStorage.setItem('rol', res.user.roles[0].name);
        this.router.navigate(['/dashboard']);
        this.toastr.success('Bienvenido', 'Inicio de sesión exitoso');
        this.usuarioService.obtenerUsuario(res.accessToken).subscribe(
          (res) => {
            console.log(res);
            
          }
        )
      },
      (err) => {
        console.log(err);
        this.toastr.error('la contraseña o el correo son incorrectos');
      }
    )
  }

  
}
