import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ActivatedRoute, Router } from '@angular/router';
import { NivelService } from '../../../../../services/nivel.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-index-nivel',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule],
  templateUrl: './index-nivel.component.html',
  styleUrl: './index-nivel.component.css'
})
export class IndexNivelComponent { 

    public nivel: any;
    public niveles:Array<any> = [];
    submitted: boolean = false;
    statuses!: any[];
    nivelmodal: boolean = false;
    public token:any = localStorage.getItem('token')

  constructor(
    private _nivelService: NivelService,
    private _router:Router,
    private _route:ActivatedRoute,
    private toastr:ToastrService
   ) {}

   ngOnInit(){
 
    this.init_data()   
  } 

  init_data() {
    
    
  
  this._nivelService.getNiveles(this.token ).subscribe(
      ( response: any[]) => {
       console.log(response)
        this.niveles = response;
        
      }
    );
   }


   openNew() {
    this.nivel = {};
    this.submitted = false;
    this.nivelmodal = true;
  }

  editProduct(nivel:any) {
        console.log(nivel)
  }

  deleteProduct(usuario:any) {
      
  }

  hideDialog() {
      this.nivelmodal = false;
      this.submitted = false;
  }

  saveProduct() {
     this._nivelService.createNivel(this.nivel,this.token).subscribe(
        (response:any)=>{
          console.log(response)
          this.nivelmodal = false;
          this.toastr.success('Nivel creado correctamente')
          this.init_data()
        },
        (error:any)=>{
          console.log(error)
          this.toastr.error('Error al crear el nivel')
        }
        
      )
  }

}
