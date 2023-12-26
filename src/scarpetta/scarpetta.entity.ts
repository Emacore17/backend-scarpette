import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Colore } from '../colore/colore.entity';
import { ScarpettaMateriale } from './scarpetta-materiale.entity';

@Entity()
export class Scarpetta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descrizione: string;

  @Column('decimal')
  prezzo: number;

  @Column('float')
  lunghezza: number;

  @Column('float')
  larghezza: number;

  @OneToMany(
    () => ScarpettaMateriale,
    (scarpettaMateriale) => scarpettaMateriale.scarpetta,
  )
  scarpettaMateriali: ScarpettaMateriale[];

  @ManyToMany(() => Colore)
  @JoinTable()
  colori: Colore[];
}
