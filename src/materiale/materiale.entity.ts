import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Scarpetta } from '../scarpetta/scarpetta.entity';

@Entity()
export class Materiale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  proprieta: string;

  @Column('float')
  valore: number;

  @ManyToMany(() => Scarpetta, (scarpetta) => scarpetta.materiali)
  scarpette: Scarpetta[];
}
