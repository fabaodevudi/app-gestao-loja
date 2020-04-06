import { Component, OnInit, TemplateRef } from '@angular/core';
import {SnotifyService} from 'ng-snotify';
import {NgxSpinnerService} from 'ngx-spinner';
import { LojaRequestDTO, createLoja } from 'src/model/dto/loja-request.dto';
import { LojaWS } from 'src/providers/ws/loja.ws';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RouterModule, Router } from '@angular/router';
import { UsuarioRequestDTO } from 'src/model/dto/usuario-request.dto';
import { CategoriaLojaRequestDTO } from 'src/model/dto/categoria-request.dto';

@Component({
  selector: 'app-gerir-loja',
  templateUrl: './gerir-loja.component.html',
  styleUrls: ['./gerir-loja.component.scss']
})
export class GerirLojaComponent implements OnInit {

  loja: LojaRequestDTO;
  usuario : UsuarioRequestDTO;
  categorias: CategoriaLojaRequestDTO[] = [];
  modalRef: BsModalRef;
  lojas: LojaRequestDTO[] = []; 
  categoria: CategoriaLojaRequestDTO;
  totalElements: number;
  nomeCategoriaFilter: string;
  
  constructor(
 
    private spinner: NgxSpinnerService, 
    private snotifyService: SnotifyService,
    private lojaWS: LojaWS,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));  
    this.buscarCategorias();
    this.buscarLojas(); 
  }

  abreNovo(template: TemplateRef<any>) {
    this.setLoja('','','','','')
    this.modalRef = this.modalService.show(template);   
  }
  abreEdita(template: TemplateRef<any>) {    
    this.modalRef = this.modalService.show(template);   
  }

  buscarLojasPorNome(){
    debugger;
    this.spinner.show();
    
    this.lojaWS.buscarPorIdUsuarioAndNome(this.usuario.id, this.nomeCategoriaFilter).subscribe(data => {     
      this.spinner.hide();
      this.lojas = data['data'].content as LojaRequestDTO[];
      this.totalElements = data['data'].totalElements;
      if(this.totalElements < 1){
        this.snotifyService.error("Nenhum registro encontrado");  
      }
    }, error => {      
      this.spinner.hide();
      let msg = "Erro no servidor. Tente mais tarde";
      if (error.status == 400) {
        msg = error.error.errors.join(' ');
      }      
      this.snotifyService.error(msg);     
    });
  }

  buscarCategorias(){
    this.spinner.show();
    this.lojaWS.buscarCategorias().subscribe(data => {     
      this.spinner.hide();
      this.categorias = data['data'];         
    }, error => {      
      this.spinner.hide();
      let msg = "Erro no servidor. Tente mais tarde";
      if (error.status == 400) {
        msg = error.error.errors.join(' ');
      }      
      this.snotifyService.error(msg);     
    });
  }

  buscarLojas(){   
    this.spinner.show();
    this.lojaWS.buscarTodos(this.usuario.id).subscribe(data => {
      this.spinner.hide();
      this.lojas = data['data'].content as LojaRequestDTO[];
      this.totalElements = data['data'].totalElements;
      if(this.totalElements < 1){
        this.snotifyService.error("Nenhum registro encontrado");  
      }
    }, error => {      
      this.spinner.hide();
      let msg = "Erro no servidor. Tente mais tarde";
      if (error.status == 400) {
        msg = error.error.errors.join(' ');
      }      
      this.snotifyService.error(msg);     
    });
  } 

  isFormValid(id:any, nome:any,descricao:any,localizacao:any,idCategoria:any):Boolean{       
    this.setLoja(id,nome,descricao,localizacao,idCategoria);
    return this.loja != null && this.loja.nome != '' && this.loja.descricao != '' && this.loja.localizacao != '' &&  !Number.isNaN(this.loja.categoriaLojaDto.id) && this.loja.usuarioDto != null;    
  }

  save(id:any, nome:any,descricao:any,localizacao:any,idCategoria:any){    
    this.setLoja(id,nome,descricao,localizacao,idCategoria);
    this.spinner.show();
    this.lojaWS.cadastrar(this.loja).subscribe(data => {
    const msg: string = "Loja Cadastrada com sucesso!";
    this.snotifyService.success(msg);
    this.buscarLojas();  
    }, error => {      
      this.spinner.hide();
      let msg = "Erro no servidor. Tente mais tarde";
      if (error.status == 400) {
        msg = error.error.errors.join(' ');
      }      
      this.snotifyService.error(msg);     
    });   
    this.modalRef.hide();
  }

  delete(id:any){
    this.lojaWS.excluir(id).subscribe(data => {
      this.spinner.hide();
      const msg: string = "Loja Excluída com sucesso!";
      this.snotifyService.success(msg); 
      this.buscarLojas();  
    }, error => {      
      this.spinner.hide();
      let msg = "Erro no servidor. Tente mais tarde";
      if (error.status == 400) {
        msg = error.error.errors.join(' ');
      }      
      this.snotifyService.error(msg);     
    });
  }

  edita(loja:any){  
   this.loja = loja;
   this.categoria = this.loja.categoriaLojaDto;
   
  }

  setLoja(id:any, nome:any,descricao:any,localizacao:any,idCategoria:any){
    this.loja = <LojaRequestDTO>{};
    this.loja.id = id;
    this.loja.nome = nome;
    this.loja.descricao = descricao;   
    this.loja.localizacao = localizacao;     
    this.loja.usuarioDto = JSON.parse(localStorage.getItem('usuario'));   
    this.loja.categoriaLojaDto = <CategoriaLojaRequestDTO>{};
    this.loja.categoriaLojaDto.id=idCategoria;
   
  }
}
