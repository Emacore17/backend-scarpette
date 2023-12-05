import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Scarpetta } from '../scarpetta/scarpetta.entity';

@Entity()
export class Dimensione {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  larghezza: number;

  @Column()
  lunghezza: number;

  @ManyToOne(() => Scarpetta, (scarpetta) => scarpetta.dimensioni)
  scarpetta: Scarpetta;
}
