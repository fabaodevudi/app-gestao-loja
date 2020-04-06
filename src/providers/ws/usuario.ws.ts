import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService} from '../environment/environment.service';
import {Observable} from 'rxjs';
import { UsuarioRequestDTO } from '../../model/dto/usuario-request.dto';


@Injectable()
export class UsuarioWS {

  constructor(private httpClient: HttpClient, private env: EnvironmentService) {
  } 

  public cadastrar(usuario: UsuarioRequestDTO): Observable<any> {   
    return this.httpClient.post(this.env.getHostAuth() + '/cadastro/usuario' , usuario);
  }

  public editar(usuario: UsuarioRequestDTO): Observable<any> {  
    return this.httpClient.put(this.env.getHostURL()+ '/usuario' , usuario);
  }

}