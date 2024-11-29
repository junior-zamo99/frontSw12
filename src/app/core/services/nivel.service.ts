import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NivelService {

  
  private url='http://127.0.0.1:8000/api/'
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
