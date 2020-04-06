
import { UsuarioRequestDTO } from './usuario-request.dto';
import { CategoriaLojaRequestDTO } from './categoria-request.dto';

export interface LojaRequestDTO {
    id: number;
    nome: string;
    descricao: string;
    localizacao: string;  
    usuarioDto: UsuarioRequestDTO;
    categoriaLojaDto: CategoriaLojaRequestDTO;
  }

  export function createLoja(id: number, nome: string, descricao: string, localizacao: string, usuarioDto: UsuarioRequestDTO, categoriaLojaDto: CategoriaLojaRequestDTO ){
    const lojaRequestDTO: LojaRequestDTO = <LojaRequestDTO>{};
    lojaRequestDTO.id = id;
    lojaRequestDTO.nome = nome;
    lojaRequestDTO.descricao = descricao;
    lojaRequestDTO.localizacao = localizacao;
    lojaRequestDTO.usuarioDto = usuarioDto;
    lojaRequestDTO.categoriaLojaDto = categoriaLojaDto;
    return lojaRequestDTO;
  }