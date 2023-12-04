import { Module } from '@nestjs/common';
import { MaterialeService } from './materiale.service';
import { MaterialeController } from './materiale.controller';

@Module({
  controllers: [MaterialeController],
  providers: [MaterialeService],
})
export class MaterialeModule {}
