import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { UsuarioService } from '../../../services/usuario.service';
import { IPayPalConfig, NgxPayPalModule,ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [CommonModule,DividerModule,ButtonModule,RouterLink,NgxPayPalModule],
  templateUrl: './planes.component.html',
  styleUrl: './planes.component.css'
})
export class PlanesComponent implements OnInit {

   public token = localStorage.getItem('token');
  suscripcion:any = {};
  public payPalConfig ? : IPayPalConfig;
  public showSuccess: boolean = false;
  public showCancel: boolean = false;
  public showError: boolean = false;
    constructor(
      private _usuarioService:UsuarioService,
      private _router:Router
    ){}


      suscripcionPremium(){
      this.suscripcion.suscripcion_id = 2;
      console.log(this.suscripcion)
      this._usuarioService.actualizarSuscripcion(this.suscripcion,this.token).subscribe(
        response=>{
          console.log(response)
          this._router.navigate(['/examen-inicial'])
        },
        error=>{
          console.log(error)
    })}

    ngOnInit(): void {
      this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR', // Asegúrate de que este código coincida con 'currency_code'
      clientId: 'Aat1GXTAFWbFCeoLvA1UdTnSM30Qew6V5Iu9_cV0ynQJApoY18Lsirfm-SaoA8kHOVeft7NiFz8VNqw_', // Reemplaza 'sb' con tu Client ID en producción
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR', // Asegúrate de que coincida con 'currency'
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [{
            name: 'Suscripción Premium',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: '9.99',
            },
          }]
        }]
      },
      advanced: {
        commit: 'true' 
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transacción aprobada, pero no autorizada', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - puedes obtener los detalles completos de la orden aquí: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - transacción completada', data);
        this.showSuccess = true;
        // Aquí puedes actualizar la suscripción del usuario en tu backend
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.showCancel = true;
      },
      onError: err => {
        console.log('OnError', err);
        this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        this.resetStatus(); // Asegúrate de definir este método
      }
    };
  }

  // Método añadido
  private resetStatus(): void {
    this.showSuccess = false;
    this.showCancel = false;
    this.showError = false;
  }
}



