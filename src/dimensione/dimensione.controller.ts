import { Controller } from '@nestjs/common';
import { DimensioneService } from './dimensione.service';

@Controller('dimensione')
export class DimensioneController {
  constructor(private readonly dimensioneService: DimensioneService) {}
}
