import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as request from 'supertest';
import { Desenvolvedores } from './desevolvedores.entity';
import { Niveis } from './niveis.entity';

describe('AppController', () => {
  let appController: AppController;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = moduleFixture.get<AppController>(AppController);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.helloWorld()).toBe('Hello World!');
    });


    it('/ (POST)', () => {
      let desenvolvedor=new Desenvolvedores()
      desenvolvedor.nome="Flávio"
      //get nivel 3 no bando de dados
    
      let nivel=new Niveis()
      nivel.id=17
      nivel.nivel="Jedi"
      
      desenvolvedor.nivel_id=nivel
      desenvolvedor.datanascimento="1988-03-28"
      desenvolvedor.sexo="m"
      desenvolvedor.hobby="Programar"

      return request(app.getHttpServer())
        .post('/cadastrar/desenvolvedor')
        .send(desenvolvedor)
        //.expect(201)
        //.expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.nome).toBe('Flávio');
          expect(res.body.nivel_id.nivel).toBe('Jedi');
          expect(res.body.datanascimento).toBe('1988-03-28');
          expect(res.body.sexo).toBe('m');
          expect(res.body.hobby).toBe('Programar');
        });
  
    });


  });
});
