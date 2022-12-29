import { Injectable, Param } from '@nestjs/common';
import { Desenvolvedores } from './desevolvedores.entity';

import "reflect-metadata";
import { getConnection, Like } from "typeorm";
import { Niveis } from './niveis.entity';

@Injectable()
export class AppService {

  helloWorld(): string {
    return 'Hello World!';
  }

  async listarDesenvolvedores(): Promise<Desenvolvedores[]> {
        const defaultConnection = getConnection();
        const desenvolvedores = await defaultConnection.getRepository(Desenvolvedores).find({
            relations: ["nivel_id"],
            order: {
                id: "DESC"
            }
        });
        return desenvolvedores;
  }

  //listar desenvolvedores paginando
  async listarDesenvolvedoresPaginacao(paginacao): Promise<any> {
      const defaultConnection = getConnection();
      const desenvolvedores = await defaultConnection.getRepository(Desenvolvedores).find({
          relations: ["nivel_id"],
          order: {
            id: "DESC"
          },
          skip: (parseInt(paginacao)-1)*6,
          take: 6
      });
      //get total
      const total = await defaultConnection.getRepository(Desenvolvedores).find();
      
      return {
        total: total.length,
        desenvolvedores:desenvolvedores
      };
      
  }

  //api/buscar/desenvolvedores/:busca/:paginacao
  async buscarDesenvolvedores(@Param('busca') busca: string, @Param('paginacao') paginacao: string): Promise<any> {
      const defaultConnection = getConnection();
      const desenvolvedores = await defaultConnection.getRepository(Desenvolvedores).find({
          where: {
              nome: Like(`%${busca}%`),
              hobby: Like(`%${busca}%`)
          },
          relations: ["nivel_id"],
          order: {
            id: "DESC"
          },
          skip: (parseInt(paginacao)-1)*6,
          take: 6
      });

      
      const total = await defaultConnection.getRepository(Desenvolvedores).find();
      
      return {
        total: total.length,
        desenvolvedores:desenvolvedores
      };
  }

  //api/desenvolvedor/:id
  async buscarDesenvolvedor(@Param('id') id: number): Promise<Desenvolvedores> {

    //trazer desenvolvedor e nivel
    const defaultConnection = getConnection();
    const desenvolvedor = await defaultConnection.getRepository(Desenvolvedores).findOne(id, {
        relations: ["nivel_id"],
        order: {
          id: "DESC"
        }
    });

    return desenvolvedor;
  }

  //api/cadastrar/desenvolvedor
  async cadastrarDesenvolvedor(desenvolvedor: Desenvolvedores): Promise<Desenvolvedores> {
      const defaultConnection = getConnection();
      const desenvolvedorCadastrado = await defaultConnection.getRepository(Desenvolvedores).save(desenvolvedor);

      //select desenvolvedor left join niveis
      const desenvolvedorComNivel = await defaultConnection.getRepository(Desenvolvedores).findOne(desenvolvedorCadastrado.id, {
        relations: ["nivel_id"]
      });

      
      return desenvolvedorComNivel;
  }

  //api/editar/desenvolvedor/:id
  async editarDesenvolvedor(@Param('id') id: number, desenvolvedor: Desenvolvedores): Promise<any> {
      const defaultConnection = getConnection();
      await defaultConnection.getRepository(Desenvolvedores).update(id, desenvolvedor);
      const desenvolvedorComNivel = await defaultConnection.getRepository(Desenvolvedores).findOne(id, {
        relations: ["nivel_id"]
      });
      return desenvolvedorComNivel;
  }

  //api/deletar/desenvolvedor/:id
  async excluirDesenvolvedor(@Param('id') id: number): Promise<any> {
      const defaultConnection = getConnection();
      const desenvolvedorExcluido = await defaultConnection.getRepository(Desenvolvedores).delete(id);
      if (desenvolvedorExcluido.affected === 1) {
          return {
            message: 'Desenvolvedor excluído com sucesso'
          }
      } else {
          return {
            message: 'Desenvolvedor não encontrado'
          }
      }
  }

  //listar niveis
  async listarNiveis(): Promise<Niveis[]> {
      const defaultConnection = getConnection();
      const niveis = await defaultConnection.getRepository(Niveis).find({
          order: {
            id: "DESC"
          }
      });
      return niveis;
  }

  //listar niveis com paginação
  async listarNiveisPaginacao(@Param('paginacao') paginacao:string): Promise<any> {
    const defaultConnection = getConnection();
    const niveis = await defaultConnection.getRepository(Niveis).find({
        order: {
            id: "DESC"
        },
        skip: (parseInt(paginacao)-1)*6,
        take: 6
    });
    const total = await defaultConnection.getRepository(Niveis).find();
      
    return {
      total: total.length,
      niveis:niveis
    };
  }

  //api/buscar/niveis/:busca/:paginacao
  async buscarNiveis(@Param('busca') busca: string, @Param('paginacao') paginacao: string): Promise<any> {
      const defaultConnection = getConnection();
      const niveis = await defaultConnection.getRepository(Niveis).find({
          where: {
              nivel: Like(`%${busca}%`)
          },
          order: {
            id: "DESC"
        },
        skip: (parseInt(paginacao)-1)*6,
        take: 6
      });
      const total = await defaultConnection.getRepository(Niveis).find();
      
      return {
        total: total.length,
        niveis:niveis
      };
  }

  //api/nivel/:id
  async buscarNivel(@Param('id') id: number): Promise<Niveis> {
      const defaultConnection = getConnection();
      const nivel = await defaultConnection.getRepository(Niveis).findOne(id);
      return nivel;
  }

  //api/cadastrar/nivel
  async cadastrarNivel(nivel: Niveis): Promise<Niveis> {
      const defaultConnection = getConnection();
      const nivelCadastrado = await defaultConnection.getRepository(Niveis).save(nivel)
      return nivelCadastrado;
  }

  //api/editar/nivel/:id
  async editarNivel(@Param('id') id: number, nivel: Niveis): Promise<any> {
      const defaultConnection = getConnection();
      const nivelEditado = await defaultConnection.getRepository(Niveis).update(id, nivel);
      return nivelEditado;
  }

  //api/deletar/nivel/:id
  async excluirNivel(@Param('id') id: number): Promise<any> {
      const defaultConnection = getConnection()
      const nivelExcluido = await defaultConnection.getRepository(Niveis).delete(id);
      if (nivelExcluido.affected === 1) {
          return {
            status: 201,
            message: 'Nível excluído com sucesso'
          }
      } else {
          return {
            status: 404,
            message: 'Nível não encontrado'
          }
      }
  }
}
