import { AppService } from './app.service';
import { Desenvolvedores } from './desevolvedores.entity';
import { Niveis } from './niveis.entity';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    helloWorld(): string;
    listarDesenvolvedores(): any;
    listarDesenvolvedoresPaginacao(paginacao: string): any;
    buscarDesenvolvedores(busca: string, paginacao: string): any;
    buscarDesenvolvedor(id: number): any;
    cadastrarDesenvolvedor(desenvolvedor: Desenvolvedores): any;
    editarDesenvolvedor(id: number, desenvolvedor: Desenvolvedores): any;
    excluirDesenvolvedor(id: number): any;
    listarNiveis(): any;
    listarNiveisPaginacao(paginacao: string): any;
    buscarNiveis(busca: string, paginacao: string): any;
    buscarNivel(id: number): any;
    cadastrarNivel(nivel: Niveis): any;
    editarNivel(id: number, nivel: Niveis): any;
    excluirNivel(response: any, id: number): Promise<any>;
}
