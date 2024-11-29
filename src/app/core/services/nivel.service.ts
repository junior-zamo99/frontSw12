import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class NivelService {

  
  public url=GLOBAL.url
  constructor(
    private  _http: HttpClient
  ) {}


  createNivel(data:any,token:string):Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json', 
    });
    return this._http.post(this.url+'nivel',data,{headers})

  }

  getNiveles(token:string):Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json', 
    });
    return this._http.get(this.url+'nivel',{headers})
  }



}
