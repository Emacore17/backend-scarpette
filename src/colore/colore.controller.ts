import { Controller } from '@nestjs/common';
import { ColoreService } from './colore.service';

@Controller('colore')
export class ColoreController {
  constructor(private readonly coloreService: ColoreService) {}
}
