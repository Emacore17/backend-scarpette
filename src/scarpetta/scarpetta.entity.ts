import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Materiale } from '../materiale/materiale.entity';
import { Colore } from '../colore/colore.entity';
import { Dimensione } from '../dimensione/dimensione.entity';

@Entity()
export class Scarpetta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  prezzo: number;

  @OneToMany(() => Dimensione, (dimensione) => dimensione.scarpetta)
  dimensioni: Dimensione[];

  @ManyToMany(() => Materiale)
  @JoinTable()
  materiali: Materiale[];

  @ManyToMany(() => Colore)
  @JoinTable()
  colori: Colore[];
}
