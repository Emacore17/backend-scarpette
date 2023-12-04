import { Module } from '@nestjs/common';
import { ScarpettaController } from './scarpetta.controller';
import { ScarpettaService } from './scarpetta.service';

@Module({
  controllers: [ScarpettaController],
  providers: [ScarpettaService],
})
export class ScarpettaModule {}
