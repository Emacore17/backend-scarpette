import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ScarpettaMateriale } from 'src/scarpetta/scarpetta-materiale.entity';

@Entity()
export class Materiale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  proprieta: string;

  @OneToMany(
    () => ScarpettaMateriale,
    (scarpettaMateriale) => scarpettaMateriale.materiale,
  )
  scarpettaMateriali: ScarpettaMateriale[];
}
