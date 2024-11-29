import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class ProgresoService {

  public url=GLOBAL.url
  constructor(
    private  _http: HttpClient
  ) {}


  obtenerProgreso(token:any):Observable<any>{
    
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(this.url+'user/progreso',{headers})
  }

  marcarNivelComoCompletado(id:any,data:any,token:any):Observable<any>{
  
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.post(this.url+'nivel/'+id+'/completado',data,{headers})
    
  }

  comprobarNivelMarcadoComoCompletado(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(this.url+'nivel/'+id+'/completado',{headers})
  }

}
