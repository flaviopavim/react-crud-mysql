import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";

import { Desenvolvedores } from './desevolvedores.entity';
import { Niveis } from './niveis.entity';

const PORT = 3002;


let arrayDesenvolvedores = [
  //Eu
  { nivel_id: 17, nome: 'Flávio Pavim', datanascimento:'28/03/1988', sexo:'m', hobby: 'Desenvolver softwares' },
  //Dragon Ball
  { nivel_id: 2, nome: 'Goku', datanascimento:'26/12/1954', sexo:'m', hobby: 'Comer' },
  { nivel_id: 3, nome: 'Vegeta', datanascimento:'26/12/1954', sexo:'m', hobby: 'Lutar' },
  { nivel_id: 4, nome: 'Gohan', datanascimento:'26/12/1954', sexo:'m', hobby: 'Lutar' },
  { nivel_id: 5, nome: 'Piccolo', datanascimento:'26/12/1954', sexo:'m', hobby: 'Lutar' },
  { nivel_id: 6, nome: 'Trunks', datanascimento:'26/12/1954', sexo:'m', hobby: 'Viajar' },
  { nivel_id: 7, nome: 'Majin Buu', datanascimento:'26/12/1954', sexo:'m', hobby: '---' },
  { nivel_id: 8, nome: 'Cell', datanascimento:'26/12/1954', sexo:'m', hobby: 'Destruir' },
  { nivel_id: 9, nome: 'Frieza', datanascimento:'26/12/1954', sexo:'m', hobby: 'Destruir' },
  { nivel_id: 10, nome: 'Android 18', datanascimento:'26/12/1954', sexo:'m', hobby: '---' },
  { nivel_id: 11, nome: 'Android 17', datanascimento:'26/12/1954', sexo:'m', hobby: '---' },
  { nivel_id: 12, nome: 'Android 16', datanascimento:'26/12/1954', sexo:'m', hobby: 'Destruir' },
  //Star Wars
  { nivel_id: 16, nome: 'Luke Skywalker', datanascimento:'26/12/1954', sexo:'m', hobby: 'Combater os Sith' },
  { nivel_id: 16, nome: 'Darth Vader', datanascimento:'26/12/1954', sexo:'m', hobby: 'Destruir' },
  { nivel_id: 17, nome: 'Count Dooku', datanascimento:'26/12/1954', sexo:'m', hobby: '---' },
  { nivel_id: 17, nome: 'Darth Maul', datanascimento:'26/12/1954', sexo:'m', hobby: '---' },
  { nivel_id: 18, nome: 'Yoda', datanascimento:'26/12/1954', sexo:'m', hobby: 'Viajar gostar eu' },
  { nivel_id: 18, nome: 'Qui-Gon Jinn', datanascimento:'26/12/1954', sexo:'m', hobby: '---' },
  { nivel_id: 19, nome: 'Mace Windu', datanascimento:'26/12/1954', sexo:'m', hobby: '---' },
  { nivel_id: 20, nome: 'Darth Sidious', datanascimento:'26/12/1954', sexo:'m', hobby: '---' },
  { nivel_id: 21, nome: 'Anakin Skywalker', datanascimento:'26/12/1954', sexo:'m', hobby: '---' },
  { nivel_id: 22, nome: 'Obi-Wan Kenobi', datanascimento:'26/12/1954', sexo:'m', hobby: '---' }
]

//níveis de demonstração
let arrayNiveis = [
  'Jedi Padawan',//23
  'Sith Apprentice',
  'Jedi Knight',
  'Apprentice', //20
  'Master',
  'Sith Lord',
  'Jedi',
  'Jedi Master', //16
  'Super Sayajin', //15
  'Super Sayajin 2',
  'Super Sayajin 3',
  'Super Sayajin 4',
  'Super Sayajin 5',
  'Super Sayajin 6', //10
  'Super Sayajin 7',
  'Super Sayajin 8',
  'Super Sayajin 9',
  'Super Sayajin 10',
  'Super Sayajin 11',
  'Super Sayajin 12',
  'Super Sayajin 13',
  'Super Sayajin 14',
  'Super Sayajin 15', //1
]

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  //connect to database
  await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "react_test",
    entities: [
        Desenvolvedores,
        Niveis,
    ],
    synchronize: true,
    logging: true
  });

  //verificar se existem niveis no banco
  const defaultConnection = getConnection();
  const niveis = await defaultConnection.getRepository(Niveis).find();
  if(niveis.length === 0){
    //inserir níveis no banco
    arrayNiveis.reverse()
    for(let i = 0; i < arrayNiveis.length; i++){
      let nivel = new Niveis();
      nivel.nivel = arrayNiveis[i];
      await defaultConnection.getRepository(Niveis).save(nivel);
    }
  }

  //verificar se existem desenvolvedores no banco
  const desenvolvedores = await defaultConnection.getRepository(Desenvolvedores).find();
  if(desenvolvedores.length === 0){
    //inserir desenvolvedores no banco
    arrayDesenvolvedores.reverse()
    for(let i = 0; i < arrayDesenvolvedores.length; i++){
      let desenvolvedor = new Desenvolvedores();
      desenvolvedor.nome = arrayDesenvolvedores[i].nome;
      //converter data de nascimento
      let data = arrayDesenvolvedores[i].datanascimento.split('/');
      desenvolvedor.datanascimento = data[2] + '-' + data[1] + '-' + data[0];
      desenvolvedor.sexo = arrayDesenvolvedores[i].sexo;
      desenvolvedor.hobby = arrayDesenvolvedores[i].hobby;
      //buscar nivel
      let nivel = await defaultConnection.getRepository(Niveis).findOne({id: arrayDesenvolvedores[i].nivel_id});
      desenvolvedor.nivel_id = nivel;

      await defaultConnection.getRepository(Desenvolvedores).save(desenvolvedor);
    }
      
    
  }
  

  app.listen(PORT, () => {
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
  });

}
bootstrap();