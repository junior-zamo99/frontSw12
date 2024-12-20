import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GLOBAL } from './GLOBAL';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url=GLOBAL.url
  constructor(
    private  _http: HttpClient
  ) {}

  actualizarSuscripcion(data:any,token:any):Observable<any>{
    
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.put(this.url+'user/suscripcion',data,{headers})

  } 


  obtenerProgreso(token:any):Observable<any>{
    
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(this.url+'user/progreso',{headers})
  }

  obtenerEstudiante(id:any,token:any):Observable<any>{
    
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(this.url+'estudiantes/user/'+id,{headers})
  }

  obtenerUsuario(token:any):Observable<any>{
    
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(this.url+'user',{headers})

  }



  
  
 }
