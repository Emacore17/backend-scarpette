import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Scarpetta } from './scarpetta.entity';
import { Colore } from 'src/colore/colore.entity';
import { Materiale } from 'src/materiale/materiale.entity';
import { ScarpettaMateriale } from './scarpetta-materiale.entity';

@Injectable()
export class ScarpettaService {
  constructor(
    @InjectRepository(Scarpetta) private scarpettaRepo: Repository<Scarpetta>,

    @InjectRepository(Colore) private coloreRepo: Repository<Colore>,
    @InjectRepository(Materiale) private materialeRepo: Repository<Materiale>,
    @InjectRepository(ScarpettaMateriale)
    private scarpettaMaterialeRepo: Repository<ScarpettaMateriale>,
  ) {}

  tutteLeScarpette() {
    return 'all scarpette';
  }

  saluto() {
    return 1000;
  }

  async createScarpetta(createScarpettaDto: any) {
    return await this.scarpettaRepo.manager.transaction(
      async (entityManager) => {
        const scarpetta = this.scarpettaRepo.create({
          nome: createScarpettaDto.nome,
          descrizione: createScarpettaDto.descrizione,
          prezzo: createScarpettaDto.prezzo,
          larghezza: createScarpettaDto.larghezza,
          lunghezza: createScarpettaDto.lunghezza,
          colori: [],
        });

        const savedScarpetta = await entityManager.save(scarpetta);

        // Carica tutti i Materiali e Colori necessari in anticipo
        const nomiMateriali = createScarpettaDto.materiali.map(
          (m: any) => m.proprieta,
        );
        const materialiEsistenti = await this.materialeRepo.findBy({
          proprieta: In(nomiMateriali),
        });
        const mappaMateriali = new Map(
          materialiEsistenti.map((m) => [m.proprieta, m]),
        );

        const coloriEsistenti = await this.coloreRepo.findBy({
          id: In(createScarpettaDto.colori),
        });
        const mappaColori = new Map(coloriEsistenti.map((c) => [c.id, c]));

        // Associa i materiali alla scarpetta
        for (const materialeDto of createScarpettaDto.materiali) {
          const materiale = mappaMateriali.get(materialeDto.proprieta);
          if (!materiale) {
            // Gestisci il caso in cui il materiale non è trovato
            continue;
          }

          const scarpettaMateriale = this.scarpettaMaterialeRepo.create({
            scarpetta: savedScarpetta,
            materiale,
            percentuale: materialeDto.valore,
          });

          await entityManager.save(scarpettaMateriale);
        }

        // Associa i colori alla scarpetta
        for (const coloreId of createScarpettaDto.colori) {
          const colore = mappaColori.get(coloreId);
          if (colore) {
            savedScarpetta.colori.push(colore);
          } else {
            // Gestisci il caso in cui il colore non è trovato
            continue;
          }
        }

        await entityManager.save(savedScarpetta);

        return savedScarpetta;
      },
    );
  }

  async scarpettaById(id: number) {
    return this.scarpettaRepo.findOne({
      where: {
        id: id,
      },
      relations: [
        'colori',
        'scarpettaMateriali',
        'scarpettaMateriali.materiale',
      ],
    });
  }
}
