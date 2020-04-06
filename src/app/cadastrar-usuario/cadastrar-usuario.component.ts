import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {SnotifyService} from 'ng-snotify';
import {NgxSpinnerService} from 'ngx-spinner';
import { UsuarioRequestDTO, createUsuario } from 'src/model/dto/usuario-request.dto';
import { UsuarioWS } from 'src/providers/ws/usuario.ws';
import { LoginRequestDTO, createLogin } from 'src/model/dto/login-request.dto';
import { RouterModule, Router } from '@angular/router';
import {AuthGuardService} from '../guards/auth.guard.service';
@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent implements OnInit {

  form: FormGroup;
  usuario : UsuarioRequestDTO;
  usuariologin: LoginRequestDTO;  

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService, 
    private snotifyService: SnotifyService,
    private usuarioWS: UsuarioWS,
    private routes: Router,
    private authGuardService: AuthGuardService
    ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      cpf: [null, Validators.required],
      telefone: [null, Validators.required],
      senha: [null, [Validators.required, Validators.minLength(6)]],
      reSenha: [null, Validators.required]
    });

    this.usuario = <UsuarioRequestDTO>{};
    this.usuariologin = <LoginRequestDTO>{};
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

  setUsuario(){
    let email : string = this.form.get('email').value;
    let nome : string = this.form.get('nome').value;
    let cpf : string = this.form.get('cpf').value.toString().replace(/[^\d]+/g, '');
    let telefone : string = this.form.get('telefone').value.toString().replace(/[^\d]+/g, '');
    let senha : string = this.form.get('senha').value;
    this.usuariologin = createLogin(null, email, senha);
    this.usuario = createUsuario(null, nome, telefone, cpf, this.usuariologin);
  }

  onSubmit() {
    this.spinner.show();
    this.setUsuario(); 
    debugger;
    this.usuarioWS.cadastrar(this.usuario).subscribe(data => {
      debugger;
      const msg: string = "Cadastro realizado com sucesso!";
      this.snotifyService.success(msg);     
      this.routes.navigate(['/app-login']);

    }, error => {
      let msg = "Erro no servidor. Tente mais tarde";
      if (error.status == 400) {
        msg = error.error.errors.join(' ');
      }
      this.spinner.hide();
      this.snotifyService.error(msg);     
    });
  }

}
