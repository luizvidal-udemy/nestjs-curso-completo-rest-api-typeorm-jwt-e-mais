import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RecadosUtils } from 'src/recados/recados.utils';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PessoasService } from './pessoas.service';

@Controller('pessoas')
export class PessoasController {
  constructor(
    private readonly pessoasService: PessoasService,
    private readonly recadosUtil: RecadosUtils,
  ) {}

  @Post()
  create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoasService.create(createPessoaDto);
  }

  @Get()
  findAll() {
    console.log(this.recadosUtil.inverteString('luiz'));
    console.log(this.recadosUtil.inverteString('luiz'));
    return this.pessoasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pessoasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePessoaDto: UpdatePessoaDto) {
    return this.pessoasService.update(+id, updatePessoaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pessoasService.remove(+id);
  }
}
