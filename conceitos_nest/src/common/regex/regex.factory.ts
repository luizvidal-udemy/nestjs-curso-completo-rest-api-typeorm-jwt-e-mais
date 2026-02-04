import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OnlyLowercaseLettersRegex } from './only-lowercase-letters.regex';
import { RegexProtocol } from './regex.protocol';
import { RemoveSpacesRegex } from './remove-spaces.regex';

export type ClassNames = 'OnlyLowewrcaseLettersRegex' | 'RemoveSpacesRegex';

@Injectable()
export class RegexFactory {
  create(className: ClassNames): RegexProtocol {
    switch (className) {
      case 'OnlyLowewrcaseLettersRegex':
        return new OnlyLowercaseLettersRegex();
      case 'RemoveSpacesRegex':
        return new RemoveSpacesRegex();

      default:
        throw new InternalServerErrorException('Classe não encontrada');
    }
  }
}
