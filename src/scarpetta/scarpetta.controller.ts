import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ScarpettaService } from './scarpetta.service';

@Controller('scarpetta')
export class ScarpettaController {
  constructor(private readonly scarpetteService: ScarpettaService) {}
  @Get('tutte')
  tutteLeScarpette() {
    return this.scarpetteService.tutteLeScarpette();
  }

  @Get(':id')
  scarpettaById(@Param('id') id: number) {
    return this.scarpetteService.scarpettaById(id);
  }

  @Post('crea')
  creaScarpetta(@Body() scarpetta: any) {
    return this.scarpetteService.creaScarpetta(scarpetta);
  }
}
