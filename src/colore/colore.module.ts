import { Module } from '@nestjs/common';
import { ColoreService } from './colore.service';
import { ColoreController } from './colore.controller';

@Module({
  controllers: [ColoreController],
  providers: [ColoreService],
})
export class ColoreModule {}
