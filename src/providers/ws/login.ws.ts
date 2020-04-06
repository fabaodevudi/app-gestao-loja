import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService} from '../environment/environment.service';
import {Observable} from 'rxjs';
import { LoginRequestDTO } from '../../model/dto/login-request.dto';

@Injectable()
export class LoginWS {

  constructor(private httpClient: HttpClient, private env: EnvironmentService) {
  } 

  public login(login: LoginRequestDTO): Observable<any> {   
    return this.httpClient.post(this.env.getHostAuth() , login);
  }

}