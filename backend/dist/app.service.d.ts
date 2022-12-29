import { Desenvolvedores } from './desevolvedores.entity';
import "reflect-metadata";
import { Niveis } from './niveis.entity';
export declare class AppService {
    helloWorld(): string;
    listarDesenvolvedores(): Promise<Desenvolvedores[]>;
    listarDesenvolvedoresPaginacao(paginacao: any): Promise<any>;
    buscarDesenvolvedores(busca: string, paginacao: string): Promise<any>;
    buscarDesenvolvedor(id: number): Promise<Desenvolvedores>;
    cadastrarDesenvolvedor(desenvolvedor: Desenvolvedores): Promise<Desenvolvedores>;
    editarDesenvolvedor(id: number, desenvolvedor: Desenvolvedores): Promise<any>;
    excluirDesenvolvedor(id: number): Promise<any>;
    listarNiveis(): Promise<Niveis[]>;
    listarNiveisPaginacao(paginacao: string): Promise<any>;
    buscarNiveis(busca: string, paginacao: string): Promise<any>;
    buscarNivel(id: number): Promise<Niveis>;
    cadastrarNivel(nivel: Niveis): Promise<Niveis>;
    editarNivel(id: number, nivel: Niveis): Promise<any>;
    excluirNivel(id: number): Promise<any>;
}
