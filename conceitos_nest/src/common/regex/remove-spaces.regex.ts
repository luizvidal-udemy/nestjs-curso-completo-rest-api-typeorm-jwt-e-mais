import { RegexProtocol } from './regex.protocol';

export class RemoveSpacesRegex extends RegexProtocol {
  execute(string: string): string {
    return string.replace(/\s+/g, '');
  }
}
