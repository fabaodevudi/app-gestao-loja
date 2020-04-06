import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthGuardService } from './auth.guard.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthGuardService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {   
    return this.authService.isLoggedIn.pipe(
     
      map((isLoggedIn: boolean) => {       
        if (!isLoggedIn) {          
          if (state.url === '/app-login'){
            return true;
          } else {
            this.router.navigate(['/app-login']);
            return false;
          }          
        } else {
            // Verifica se usuário tem permissão para acessar a tela
           
            const token =  localStorage.getItem('token') != null ?  localStorage.getItem('token') : null;
            let temPermicao = false;
            if (token != null){
             
              const perfil = localStorage.getItem('perfil') != null ?  localStorage.getItem('perfil') : null;
              if(perfil == 'ROLE_USUARIO'){
                if (state.url === '/app-home' || state.url === '/app-starter' || state.url === '/app-editar-usuario' ){
                  temPermicao = true;
                }
              } else if(perfil == 'ROLE_ADMIN'){
                if (state.url === '/app-admin' || state.url === '/app-starter' || state.url === '/app-gerir-loja'){
                  temPermicao = true;
                }
              }
            }    
           
            if (!temPermicao) {           
                this.authService.logout();
                this.router.navigate(['/app-login']);                       
            } else {
              localStorage.setItem('rota', state.url);
            }
            return temPermicao;          

        }
        return true;
      }, error => {
        return false;
      })
    );
  }
}
