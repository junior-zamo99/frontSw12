import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url="http://127.0.0.1:8000/api"
  constructor(
    private  _http: HttpClient
  ) {}

  actualizarSuscripcion(data:any,token:any):Observable<any>{
    
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.put(this.url+'/user/suscripcion',data,{headers})

  } 


  obtenerProgreso(token:any):Observable<any>{
    
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(this.url+'/user/progreso',{headers})
  }

  
  
 }
