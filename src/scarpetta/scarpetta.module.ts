import { Module } from '@nestjs/common';
import { ScarpettaController } from './scarpetta.controller';
import { ScarpettaService } from './scarpetta.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scarpetta } from './scarpetta.entity';
import { Materiale } from 'src/materiale/materiale.entity';
import { Colore } from 'src/colore/colore.entity';
import { ScarpettaMateriale } from './scarpetta-materiale.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Scarpetta,
      Materiale,
      Colore,
      ScarpettaMateriale,
    ]),
  ],
  controllers: [ScarpettaController],
  providers: [ScarpettaService],
})
export class ScarpettaModule {}
