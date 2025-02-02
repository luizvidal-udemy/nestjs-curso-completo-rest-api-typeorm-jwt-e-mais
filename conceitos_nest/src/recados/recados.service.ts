import { Injectable } from '@nestjs/common';
import { Recado } from './entities/recado.entity';

@Injectable()
export class RecadosService {
  lastId = 1;

  private recados: Recado[] = [
    {
      id: 1,
      text: 'Primeiro recado',
      de: 'João',
      para: 'Maria',
      lido: false,
      data: new Date(),
    },
  ];

  findAll() {
    return this.recados;
  }

  findOne(id: string) {
    return this.recados.find((recado) => recado.id === +id);
  }

  create(recado: Recado) {
    this.lastId++;
    recado.id = this.lastId;
    this.recados.push(recado);
    return recado;
  }

  update(id: string, recado: Recado) {
    const index = this.recados.findIndex((recado) => recado.id === +id);
    this.recados[index] = { ...this.recados[index], ...recado };
    return this.recados[index];
  }

  remove(id: string) {
    this.recados = this.recados.filter((recado) => recado.id !== +id);
    return { deleted: true };
  }

  hello() {
    return 'Hello World!';
  }
}
