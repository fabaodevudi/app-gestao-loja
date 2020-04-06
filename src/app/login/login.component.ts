import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {LoginWS} from '../../providers/ws/login.ws';
import {AuthGuardService} from '../guards/auth.guard.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { LoginRequestDTO } from 'src/model/dto/login-request.dto';
import {SnotifyService} from 'ng-snotify';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private spinner: NgxSpinnerService, 
      private snotifyService: SnotifyService,
      private loginWS: LoginWS,
      private authGuardService: AuthGuardService,
      private routes: Router
      ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  onSubmit() {
    debugger;
    const loginRequest: LoginRequestDTO = <LoginRequestDTO>{};
   
    loginRequest.email = this.form.get('email').value;
    loginRequest.senha = this.form.get('password').value;

    this.spinner.show();    
      
    this.loginWS.login(loginRequest).subscribe(result => {
     
      if (result != null) {       
    
          this.authGuardService.login(result); 
          const perfil = localStorage.getItem('perfil') != null ?  localStorage.getItem('perfil') : null;
          if(perfil == 'ROLE_USUARIO'){
            this.routes.navigate(['/app-home']);    
          } else if(perfil == 'ROLE_ADMIN'){
            this.routes.navigate(['/app-admin']);    
          }
         
      } 
    }, error => {
      this.spinner.hide(); 
      this.snotifyService.error('Usuário ou senha inválido');
      this.routes.navigate(['/app-login']);

    });    
  } 

}
