import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ExamenIaService } from '../../../services/examen-ia.service';
import { ActivatedRoute } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
@Component({
  selector: 'app-leccion-retroalimentacion',
  standalone: true,
  imports: [ButtonModule,CardModule,ProgressSpinnerModule,CommonModule],
  templateUrl: './leccion-retroalimentacion.component.html',
  styleUrl: './leccion-retroalimentacion.component.css'
})
export class LeccionRetroalimentacionComponent {
  
  public leccion= this._route.snapshot.paramMap.get('leccion');
  public retroalimentacion:any = {};
  public cargarDatos:boolean = false;

  constructor(
    private _retroalimentacionService:ExamenIaService,
    private _route:ActivatedRoute,
    private _location: Location 
  ) { }

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this._retroalimentacionService.obtenerRetroalimentacion(this.leccion).subscribe((data) => {
      this.retroalimentacion = data.data;
      this.cargarDatos = true;
      console.log(this.retroalimentacion)

    });
  } 

  goBack(): void {
    this._location.back();
  }

}
