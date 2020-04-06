import { LoginRequestDTO } from './login-request.dto';

export interface UsuarioRequestDTO {
    id: number;
    nome: string;
    telefone: string;
    cpf: string;  
    usuarioLoginDto: LoginRequestDTO;
  }

  export function createUsuario(id: number, nome: string, telefone: string, cpf: string, loginRequestDTO: LoginRequestDTO ){
    const usuario: UsuarioRequestDTO = <UsuarioRequestDTO>{};
    usuario.id = id;
    usuario.nome = nome;
    usuario.cpf = cpf;
    usuario.telefone = telefone;
    usuario.usuarioLoginDto = loginRequestDTO;

    return usuario;
  }
  