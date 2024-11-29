import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public url=GLOBAL.url
  
  login(data: any):Observable<any> {
    console.log(data)
    let headers= new HttpHeaders().set('Content-Type','application/json')
    return this.http.post(this.url + 'login', data,{headers:headers})
  }

  registrar(data: any):Observable<any> {
    console.log(data)
    let headers= new HttpHeaders().set('Content-Type','application/json')
    return this.http.post(this.url + 'register', data,{headers:headers})
  }


  logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.router.navigate(['/login'])
  }
  
  EstaAutenticado(){
    try {
      if (typeof localStorage !== 'undefined') {
        const token:any = localStorage.getItem('token');
        if(!token)
        {
          return false;
        }else{
          return true;
        }
      }
      
    } catch (error) {
      localStorage.clear();
      return false;
    }
    return true;
  }




}
