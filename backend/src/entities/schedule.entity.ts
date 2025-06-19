import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Film } from './film.entity';

@Entity({ name: 'schedules' })
export class Schedules {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'film_id' }) // <-- исправлено здесь
  filmId: string;

  @Column()
  daytime: Date;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column()
  price: number;

  @Column('text', { array: true, default: [] })
  taken: string[];

  @ManyToOne(() => Film, (film) => film.schedules)
  @JoinColumn({ name: 'film_id', referencedColumnName: 'id' })
  film: Film;
}
