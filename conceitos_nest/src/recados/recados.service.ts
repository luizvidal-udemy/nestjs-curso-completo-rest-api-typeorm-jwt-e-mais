import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { Recado } from './entities/recado.entity';

@Injectable()
export class RecadosService {
  lastId = 1;

  private recados: Recado[] = [
    {
      id: 1,
      texto: 'Primeiro recado',
      de: 'João',
      para: 'Maria',
      lido: false,
      data: new Date(),
    },
  ];

  throwNotFoundError(message = 'Esse recado não existe') {
    throw new NotFoundException(message);
  }

  findAll() {
    return this.recados;
  }

  findOne(id: number) {
    const recado = this.recados.find((recado) => recado.id == id);
    if (recado) return recado;
    // throw new HttpException('Esse recado não existe', HttpStatus.NOT_FOUND);
    this.throwNotFoundError();
  }

  create(createRecadoDto: CreateRecadoDto) {
    this.lastId++;
    const id = this.lastId;
    const novoRecado: Recado = {
      id,
      ...createRecadoDto,
      lido: false,
      data: new Date(),
    };
    this.recados.push(novoRecado);
    return novoRecado;
  }

  update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const recadoExistenteIndex = this.recados.findIndex(
      (item) => item.id == id,
    );
    if (recadoExistenteIndex < 0) this.throwNotFoundError();
    const recadoExistente = this.recados[recadoExistenteIndex];
    this.recados[recadoExistenteIndex] = {
      ...recadoExistente,
      ...updateRecadoDto,
    };
    return this.recados[recadoExistenteIndex];
  }

  remove(id: number) {
    const index = this.recados.findIndex((recado) => recado.id == id);
    if (index < 0) this.throwNotFoundError();
    const recado = this.recados[index];
    this.recados = this.recados.filter((recado) => recado.id !== +id);
    return recado;
  }

  hello() {
    return 'Hello World!';
  }
}
