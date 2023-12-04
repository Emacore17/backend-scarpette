import { Module } from '@nestjs/common';
import { DimensioneService } from './dimensione.service';
import { DimensioneController } from './dimensione.controller';

@Module({
  controllers: [DimensioneController],
  providers: [DimensioneService],
})
export class DimensioneModule {}
