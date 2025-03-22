import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Pessoa } from './entities/pessoa.entity';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
  ) {}

  throwNotFoundError(message = 'Essa pessoa não existe') {
    throw new NotFoundException(message);
  }

  async create(createPessoaDto: CreatePessoaDto) {
    try {
      const dadosPessoa = {
        nome: createPessoaDto.nome,
        passwordHash: createPessoaDto.password,
        email: createPessoaDto.email,
      };
      const novaPessoa = this.pessoaRepository.create(dadosPessoa);
      await this.pessoaRepository.save(novaPessoa);
      return novaPessoa;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email já cadastrado');
      }
      throw error;
    }
  }

  async findAll() {
    return await this.pessoaRepository.find();
  }

  async findOne(id: number) {
    const pessoa = await this.pessoaRepository.findOneBy({ id });
    if (!pessoa) return this.throwNotFoundError();
    return pessoa;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const dadosPessoa = {
      nome: updatePessoaDto.nome,
      passwordHash: updatePessoaDto.password,
    };
    const pessoa = await this.pessoaRepository.preload({ id, ...dadosPessoa });

    if (!pessoa) return this.throwNotFoundError();

    return this.pessoaRepository.save(pessoa);
  }

  async remove(id: number) {
    const recado = await this.pessoaRepository.findOneBy({ id });

    if (!recado) return this.throwNotFoundError();

    return this.pessoaRepository.remove(recado);
  }
}
