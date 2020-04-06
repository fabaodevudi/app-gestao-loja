import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {SnotifyService} from 'ng-snotify';
import {NgxSpinnerService} from 'ngx-spinner';
import { UsuarioRequestDTO, createUsuario } from 'src/model/dto/usuario-request.dto';
import { UsuarioWS } from 'src/providers/ws/usuario.ws';
import { LoginRequestDTO, createLogin } from 'src/model/dto/login-request.dto';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {

  form: FormGroup;
  usuario : UsuarioRequestDTO;
  usuariologin: LoginRequestDTO;  

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService, 
    private snotifyService: SnotifyService,
    private usuarioWS: UsuarioWS,
    private routes: Router
    ) {}

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));     
    this.usuariologin = this.usuario.usuarioLoginDto;  
    this.createFormGroup();
  }
  
  createFormGroup(){
    this.form = this.formBuilder.group({
      nome: [this.usuario.nome, [Validators.required, Validators.minLength(3)]],
      email: [this.usuariologin.email, [Validators.required, Validators.email]],
      cpf: [this.usuario.cpf, Validators.required],
      telefone: [this.usuario.telefone, Validators.required],
      senha: [null, [Validators.required, Validators.minLength(6)]],
      reSenha: [null, Validators.required]
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
   
    this.usuarioWS.editar(this.usuario).subscribe(data => {
      debugger;
      const msg: string = "Dados atualizados com sucesso!";
      this.snotifyService.success(msg);     
     
    }, error => {
      debugger;
      let msg = "Erro no servidor. Tente mais tarde";
      if (error.status == 400) {
        msg = error.error.errors.join(' ');
      }
      this.spinner.hide();
      this.snotifyService.error(msg);     
    });
  }
}
