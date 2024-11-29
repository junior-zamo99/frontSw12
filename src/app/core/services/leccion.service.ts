import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class LeccionService {

  public url=GLOBAL.url
  constructor(
    private  _http: HttpClient
  ) {}


  createLeccion(data:any):Observable<any>{
     
    
    return this._http.post(this.url + 'leccion', data);
  }

  

  getLecciones():Observable<any>{
    return this._http.get(this.url+'leccion')
  }


  createEjercicio(formData: FormData,token:string):Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` 
    });
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    return this._http.post(this.url+'ejercicio',formData,{headers})

  }


  obtenerEjercicioLeccion(id:any,token:any):Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', 
    });
    return this._http.get(this.url+'leccion/'+id+'/ejercicios',{headers})
  }

  enviarRespuesta(id:any,data:any,token:any):Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', 
    });
    return this._http.post(this.url+'ejercicio/'+id+'/submit',data,{headers})
  }

  leccionCompleta(id:any,data:any,token:any):Observable<any>{
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', 
    });
    return this._http.post(this.url+'leccion/'+id+'/completada',data,{headers})
  }

  getLeccionPorNivel(id:any,token:any):Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', 
    });
    return this._http.get(this.url+'nivel/'+id+'/lecciones',{headers})
  }

}
