import { Injectable } from '@nestjs/common';

@Injectable()
export class RecadosUtils {
  inverteString(string: string): string {
    return string.split('').reverse().join('');
  }
}
