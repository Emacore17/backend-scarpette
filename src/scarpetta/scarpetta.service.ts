import { Injectable } from '@nestjs/common';

@Injectable()
export class ScarpettaService {
  tutteLeScarpette() {
    return 'tutte le scarpette';
  }
}
