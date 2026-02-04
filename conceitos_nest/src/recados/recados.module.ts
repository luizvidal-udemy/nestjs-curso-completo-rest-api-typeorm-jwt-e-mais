import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { Recado } from './entities/recado.entity';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { RecadosUtils } from './recados.utils';
import { RegexProtocol } from 'src/common/regex/regex.protocol';
import { RemoveSpacesRegex } from 'src/common/regex/remove-spaces.regex';
import { OnlyLowercaseLettersRegex } from 'src/common/regex/only-lowercase-letters.regex';
import { RegexFactory } from 'src/common/regex/regex.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recado]),
    forwardRef(() => PessoasModule),
  ],
  controllers: [RecadosController],
  providers: [RecadosService, RecadosUtils, RegexFactory, {
    provide: 'RemoveSpacesRegex',
      useFactory: (regexFactory: RegexFactory) => regexFactory.create('RemoveSpacesRegex'),
      inject: [RegexFactory],
    }],
  exports: [RecadosService, RecadosUtils],
})
export class RecadosModule {}
 