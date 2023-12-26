import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Scarpetta } from './scarpetta.entity';
import { Materiale } from 'src/materiale/materiale.entity';

@Entity()
export class ScarpettaMateriale {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Scarpetta, (scarpetta) => scarpetta.scarpettaMateriali)
  scarpetta: Scarpetta;

  @ManyToOne(() => Materiale)
  materiale: Materiale;

  @Column('int')
  percentuale: number;
}
