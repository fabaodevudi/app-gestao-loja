export interface LoginRequestDTO {
  id: number;
  email: string;
  senha: string;  
}


export function createLogin(id: number, email: string, senha: string){
  const login: LoginRequestDTO = <LoginRequestDTO>{};
  login.id = id;
  login.email = email;
  login.senha = senha;
  return login;
}
