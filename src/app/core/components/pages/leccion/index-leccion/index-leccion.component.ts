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

import { ToastrService } from 'ngx-toastr';
import { LeccionService } from '../../../../services/leccion.service';

@Component({
  selector: 'app-index-leccion',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule],
  templateUrl: './index-leccion.component.html',
  styleUrl: './index-leccion.component.css'
})
export class IndexLeccionComponent {

  public leccion: any;
    public lecciones:Array<any> = [];
    submitted: boolean = false;
    statuses!: any[];
    leccionmodal: boolean = false;
    public token:any = localStorage.getItem('token')  


  constructor(
    private _leccionService: LeccionService,
    private _router:Router,
    private _route:ActivatedRoute,
    private toastr:ToastrService
   ) {}

   ngOnInit(){
 
    this.init_data()   
  } 

  init_data() {
    
    
  
  this._leccionService.getLecciones( ).subscribe(
      ( response: any[]) => {
       console.log(response)
        this.lecciones = response;
        
      }
    );
   }


   openNew() {
    this._router.navigate(['./create'], { relativeTo: this._route });
  }

  editProduct(nivel:any) {
        console.log(nivel)
  }

  deleteProduct(usuario:any) {
      
  }

  hideDialog() {
      this.leccionmodal = false;
      this.submitted = false;
  }

  saveProduct() {
     this._leccionService.createLeccion(this.leccion).subscribe(
        (response:any)=>{
          console.log(response)
          this.leccionmodal = false;
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


