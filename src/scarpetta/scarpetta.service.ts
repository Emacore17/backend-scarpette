import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Scarpetta } from './scarpetta.entity';
import { Dimensione } from 'src/dimensione/dimensione.entity';
import { Colore } from 'src/colore/colore.entity';
import { Materiale } from 'src/materiale/materiale.entity';

@Injectable()
export class ScarpettaService {
  constructor(
    @InjectRepository(Scarpetta) private scarpettaRepo: Repository<Scarpetta>,
    @InjectRepository(Dimensione)
    private dimensioneRepo: Repository<Dimensione>,
    @InjectRepository(Colore) private coloreRepo: Repository<Colore>,
    @InjectRepository(Materiale) private materialeRepo: Repository<Materiale>,
  ) {}
  tutteLeScarpette() {
    return 'tutte le scarpette';
  }

  async creaScarpetta(creaScarpettaDto: any) {
    const scarpetta = new Scarpetta();
    scarpetta.nome = creaScarpettaDto.nome;
    scarpetta.descrizione = creaScarpettaDto.descrizione;
    scarpetta.prezzo = creaScarpettaDto.prezzo;

    // Gestione delle dimensioni
    scarpetta.dimensioni = creaScarpettaDto.dimensioni.map((d) => {
      const dimensione = new Dimensione();
      dimensione.larghezza = d.larghezza;
      dimensione.lunghezza = d.lunghezza;
      return dimensione;
    });

    const materiali = await this.materialeRepo.findBy({
      id: In(creaScarpettaDto.materiali),
    });

    scarpetta.materiali = materiali;

    // Associazione dei colori esistenti
    const colori = await this.coloreRepo.findBy({
      id: In(creaScarpettaDto.colori),
    });
    scarpetta.colori = colori;

    return this.scarpettaRepo.save(scarpetta);
  }

  async scarpettaById(id: number) {
    const scarpetta = await this.scarpettaRepo.findOne({
      where: { id },
      relations: ['dimensioni', 'materiali', 'colori'], // Assicurati che queste corrispondano ai nomi delle relazioni nel tuo modello
    });

    if (!scarpetta) {
      throw new NotFoundException(
        `Scarpetta con id ${id} non è stata trovata.`,
      );
    }

    // Trasformare i risultati in formato desiderato
    return {
      nome: scarpetta.nome,
      descrizione: scarpetta.descrizione,
      prezzo: scarpetta.prezzo,
      dimensioni: scarpetta.dimensioni.map((d) => ({
        larghezza: d.larghezza,
        lunghezza: d.lunghezza,
      })),
      materiali: scarpetta.materiali.map((m) => ({
        proprieta: m.proprieta,
        valore: m.valore,
      })),
      colori: scarpetta.colori.map((c) => c.colore), // Assumo che 'colore' sia una proprietà dell'entità 'Colore'
    };
  }
}
