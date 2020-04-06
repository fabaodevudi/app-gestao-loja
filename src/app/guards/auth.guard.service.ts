import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class AuthGuardService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(localStorage.getItem('token')!= null);

  constructor(private router: Router) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  home() {    
    this.router.navigate(['/app-starter']);
  }

  logout() {  
    localStorage.clear();
    this.loggedIn.next(false);    
    this.router.navigate(['/app-login']);
  }

  login(result: any) { 
    localStorage.setItem('token', JSON.stringify(result.data.token));   
    localStorage.setItem('usuario', JSON.stringify(result.data.usuarioDto));   
    localStorage.setItem('perfil', result.data.usuarioDto.usuarioLoginDto.perfil);   
    this.loggedIn.next(true); 
  }
  
}
