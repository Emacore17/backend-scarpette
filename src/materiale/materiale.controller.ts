import { Controller } from '@nestjs/common';
import { MaterialeService } from './materiale.service';

@Controller('materiale')
export class MaterialeController {
  constructor(private readonly materialeService: MaterialeService) {}
}
