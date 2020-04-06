import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class EnvironmentService {

  public getHostURL(): string {
    return environment.hostURL;
  }

  public getHostAuth(): string {
    return environment.hostAuth;
  }

}
