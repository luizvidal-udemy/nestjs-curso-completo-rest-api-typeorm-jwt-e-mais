import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadosModule } from 'src/recados/recados.module';
import { Pessoa } from './entities/pessoa.entity';
import { PessoasController } from './pessoas.controller';
import { PessoasService } from './pessoas.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pessoa]),
    forwardRef(() => RecadosModule),
  ],
  controllers: [PessoasController],
  providers: [PessoasService],
  exports: [PessoasService],
})
export class PessoasModule {}
