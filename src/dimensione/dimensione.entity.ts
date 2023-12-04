import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Scarpetta } from '../scarpetta/scarpetta.entity';

@Entity()
export class Dimensione {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  larghezza: string;

  @Column()
  lunghezza: string;

  @ManyToOne(() => Scarpetta, (scarpetta) => scarpetta.dimensioni)
  scarpetta: Scarpetta;
}
