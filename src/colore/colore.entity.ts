import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Scarpetta } from '../scarpetta/scarpetta.entity';

@Entity()
export class Colore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  colore: string;

  @ManyToMany(() => Scarpetta, (scarpetta) => scarpetta.colori)
  scarpette: Scarpetta[];
}
