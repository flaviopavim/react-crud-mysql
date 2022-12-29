import { Body, Controller, Delete, Get, Param, Patch, Post,HttpStatus, Res } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { AppService } from './app.service';
import { Desenvolvedores } from './desevolvedores.entity';
import { Niveis } from './niveis.entity';

@Controller()
export class AppController {
  
  constructor(private readonly appService: AppService) {}

  @Get()
  helloWorld(): string {
    return this.appService.helloWorld()
  }

  @Get('/listar/desenvolvedores')
  listarDesenvolvedores(): any {
    return this.appService.listarDesenvolvedores()
  }

  @Get('/listar/desenvolvedores/:paginacao')
  listarDesenvolvedoresPaginacao(@Param('paginacao') paginacao: string): any {
    return this.appService.listarDesenvolvedoresPaginacao(paginacao)
  }

  @Get('/buscar/desenvolvedores/:busca/:paginacao')
  buscarDesenvolvedores(@Param('busca') busca: string, @Param('paginacao') paginacao: string): any {
    return this.appService.buscarDesenvolvedores(busca, paginacao)
  }

  @Get('/desenvolvedor/:id')
  buscarDesenvolvedor(@Param('id') id: number): any {
    return this.appService.buscarDesenvolvedor(id)
  }

  @Post('/cadastrar/desenvolvedor')
  cadastrarDesenvolvedor(@Body() desenvolvedor: Desenvolvedores): any {
    return this.appService.cadastrarDesenvolvedor(desenvolvedor)
  }

  @Patch('/editar/desenvolvedor/:id')
  editarDesenvolvedor(@Param('id') id: number, @Body() desenvolvedor: Desenvolvedores): any {
    return this.appService.editarDesenvolvedor(id, desenvolvedor)
  }

  @Delete('/excluir/desenvolvedor/:id')
  excluirDesenvolvedor(@Param('id') id: number): any {
    return this.appService.excluirDesenvolvedor(id)
  }

  @Get('/listar/niveis')
  listarNiveis(): any {
    return this.appService.listarNiveis();
  }

  @Get('/listar/niveis/:paginacao')
  listarNiveisPaginacao(@Param('paginacao') paginacao: string): any {
    return this.appService.listarNiveisPaginacao(paginacao)
  }

  @Get('/buscar/niveis/:busca/:paginacao')
  buscarNiveis(@Param('busca') busca: string, @Param('paginacao') paginacao: string): any {
    return this.appService.buscarNiveis(busca, paginacao)
  }

  @Get('/nivel/:id')
  buscarNivel(@Param('id') id: number): any {
    return this.appService.buscarNivel(id)
  }

  @Post('/cadastrar/nivel')
  cadastrarNivel(@Body() nivel: Niveis): any {
    return this.appService.cadastrarNivel(nivel)
  }

  @Patch('/editar/nivel/:id')
  editarNivel(@Param('id') id: number, @Body() nivel: Niveis): any {
    return this.appService.editarNivel(id,nivel)
  }

  @Delete('/excluir/nivel/:id')
  async excluirNivel(@Res() response, @Param('id') id: number): Promise<any> {
    const defaultConnection = getConnection()
    const desenvolvedores = await defaultConnection.getRepository(Desenvolvedores).findOne({
      where: {
        nivel_id: id
      }
    });

    if (desenvolvedores) {
      return response.status(501).send({error:'Não foi possível excluir o nível. Existem desenvolvedores associados ao nível.'})
    } else {
      //verificar se existe algum nível com o id informado
      const nivel = await defaultConnection.getRepository(Niveis).findOne({
        where: {
          id: id
        }
      });

      if (nivel) {
        await defaultConnection.getRepository(Niveis).delete(id);
        return response.status(HttpStatus.OK).send({message: 'Nível excluído com sucesso!'})
      } else {
        return response.status(HttpStatus.NOT_FOUND).send({error:'Nível não encontrado.'})
      }
    }
  }

}
