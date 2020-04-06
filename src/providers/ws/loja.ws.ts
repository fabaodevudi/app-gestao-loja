import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService} from '../environment/environment.service';
import {Observable} from 'rxjs';

import { LojaRequestDTO } from 'src/model/dto/loja-request.dto';


@Injectable()
export class LojaWS {

  constructor(private httpClient: HttpClient, private env: EnvironmentService) {
  } 

  public buscarTodos(id: number): Observable<any> {   
    return this.httpClient.get(this.env.getHostURL() + '/admin/loja/listar/' + id);
  }

  public buscarPorId(id: number): Observable<any> {   
    return this.httpClient.get(this.env.getHostURL() + '/admin/loja/' + id);
  }

  public buscarCategorias(): Observable<any> {   
    return this.httpClient.get(this.env.getHostURL() + '/admin/loja/categoria');
  }

  public cadastrar(loja: LojaRequestDTO): Observable<any> {   
    return this.httpClient.post(this.env.getHostURL() + '/admin/loja' , loja);
  }

  public editar(loja: LojaRequestDTO): Observable<any> {  
    return this.httpClient.put(this.env.getHostURL()+ '/admin/loja' , loja);
  }

  public excluir(id: any): Observable<any> {  
    return this.httpClient.delete(this.env.getHostURL()+ '/admin/loja/' + id);
  }

  public buscarPorIdUsuarioAndNome(id:any, nome:string): Observable<any> {
    return this.httpClient.get(this.env.getHostURL()+ '/admin/loja/listar/nome/' + id, { params: { nome: nome } } );
  }

}