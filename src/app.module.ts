import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScarpettaModule } from './scarpetta/scarpetta.module';
import { MaterialeModule } from './materiale/materiale.module';
import { ColoreModule } from './colore/colore.module';
import { DimensioneModule } from './dimensione/dimensione.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'scarpetteDB',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ScarpettaModule,
    MaterialeModule,
    ColoreModule,
    DimensioneModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
