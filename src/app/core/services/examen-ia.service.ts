import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class ExamenIaService {

  public url=GLOBAL.url2
  public url2=GLOBAL.url
  constructor(
    private  _http: HttpClient
  ) {}


  getExamenIa():Observable<any>{
    return this._http.get(this.url+'crearExamen')
  }


  enviarExamenIa(examen:any):Observable<any>{
    console.log(examen)
    return this._http.post(this.url+'entregarNivelDeIngles',examen)
  }

  actualizarNivel(data:any,token:any):Observable<any>{
    
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.put(this.url2+'user/nivel-actual',data,{headers})

  }


  obtenerRetroalimentacion(eleccion:any):Observable<any>{
    const encodedEleccion = encodeURIComponent(eleccion);
    return this._http.get(`${this.url}retroalimentacion/${encodedEleccion}`);
  }

}
